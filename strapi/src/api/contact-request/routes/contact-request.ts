/**
 * contact-request router
 */

import { factories } from '@strapi/strapi';

// only expose create; requests are read in the admin panel
export default factories.createCoreRouter('api::contact-request.contact-request', {
  only: ['create'],
});
