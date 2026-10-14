/**
 * contact-request controller
 */

import { factories } from '@strapi/strapi';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const recentByIp = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (recentByIp.get(ip) || []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  hits.push(now);
  recentByIp.set(ip, hits);
  return hits.length > RATE_LIMIT_MAX;
}

export default factories.createCoreController('api::contact-request.contact-request', ({ strapi }) => ({
  async create(ctx) {
    const body = (ctx.request.body as any)?.data || {};
    const name = String(body.name || '').trim();
    const email = String(body.email || '').trim();
    const message = String(body.message || '').trim();

    // honeypot field: bots fill it, humans never see it
    if (body.website) {
      return ctx.send({ data: { ok: true } });
    }

    if (!name || name.length > 200) return ctx.badRequest('Please enter your name.');
    if (!EMAIL_RE.test(email)) return ctx.badRequest('Please enter a valid e-mail address.');
    if (!message || message.length > 5000) return ctx.badRequest('Please enter a message (max. 5000 characters).');

    if (isRateLimited(ctx.request.ip)) {
      return ctx.tooManyRequests('Too many requests. Please try again later.');
    }

    await strapi.documents('api::contact-request.contact-request').create({
      data: { name, email, message },
    });

    // don't echo stored data back to the public
    return ctx.send({ data: { ok: true } });
  },
}));
