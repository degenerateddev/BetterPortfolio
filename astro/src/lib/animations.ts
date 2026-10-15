import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Page-level animations. Called on every `astro:page-load`, so previous
 * triggers are killed first to avoid duplicates after client navigation.
 */
export function initAnimations() {
    ScrollTrigger.getAll().forEach((t) => t.kill());

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Hero title: one-off glitch on load
    const title = document.querySelector<HTMLElement>('[data-glitch]');
    if (title) {
        gsap.timeline()
            .from(title, { opacity: 0, duration: 0.01 })
            .to(title, { x: -8, skewX: 8, clipPath: 'inset(20% 0 40% 0)', duration: 0.06, ease: 'steps(1)' })
            .to(title, { x: 6, skewX: -4, clipPath: 'inset(60% 0 5% 0)', duration: 0.06, ease: 'steps(1)' })
            .to(title, { x: -3, skewX: 0, clipPath: 'inset(0% 0 70% 0)', duration: 0.06, ease: 'steps(1)' })
            .to(title, { x: 0, clipPath: 'inset(0% 0 0% 0)', duration: 0.06, ease: 'steps(1)' });
    }

    // Windows "boot" open when they scroll into view
    gsap.utils.toArray<HTMLElement>('[data-window]').forEach((el) => {
        gsap.from(el, {
            scaleY: 0.02,
            opacity: 0,
            duration: 0.35,
            ease: 'steps(6)',
            scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        });
    });

    // Stat bars fill up
    gsap.utils.toArray<HTMLElement>('[data-statbar]').forEach((el) => {
        gsap.from(el, {
            width: 0,
            duration: 1.2,
            ease: 'steps(12)',
            scrollTrigger: { trigger: el, start: 'top 95%', once: true },
        });
    });

    // Inventory slots pop in staggered per grid
    gsap.utils.toArray<HTMLElement>('[data-slot-grid]').forEach((grid) => {
        gsap.from(grid.querySelectorAll('[data-slot]'), {
            y: 24,
            opacity: 0,
            duration: 0.3,
            stagger: 0.07,
            ease: 'steps(4)',
            scrollTrigger: { trigger: grid, start: 'top 85%', once: true },
        });
    });
}
