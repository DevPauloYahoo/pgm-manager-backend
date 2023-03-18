import { Router } from 'express';

import { AuthMiddleware } from '../auth/middlewares/auth.middleware';
import { resolver } from '../helpers';
import { visitController } from './index';

const visitRoutes = Router();

visitRoutes
  .post(
    '/visits',
    AuthMiddleware(['USER', 'ADMIN']),
    resolver(visitController.createVisit),
  )
  .post(
    '/visits/:id',
    AuthMiddleware(['USER', 'ADMIN']),
    resolver(visitController.createVisitToVisitor),
  )
  .patch(
    '/visits/:id',
    AuthMiddleware(['USER', 'ADMIN']),
    resolver(visitController.updateStatus),
  )
  .get(
    '/visits',
    AuthMiddleware(['USER', 'ADMIN', 'GUEST']),
    resolver(visitController.findAll),
  )
  .get(
    '/visits/badge_exists',
    resolver(visitController.findByStatusBadgeSecretary),
  )
  .get('/visits/all_badges', resolver(visitController.findBadgesBySecretary))
  .get(
    '/visits/by_visitor/:id',
    AuthMiddleware(['USER', 'ADMIN', 'GUEST']),
    resolver(visitController.findVisitByStatusAndVisitorId),
  )
  .get(
    '/visits/:id',
    AuthMiddleware(['USER', 'ADMIN', 'GUEST']),
    resolver(visitController.findOne),
  );

export default visitRoutes;
