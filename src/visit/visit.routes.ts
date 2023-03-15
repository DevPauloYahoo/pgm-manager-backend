import { Router } from 'express';

import { AuthMiddleware } from '../auth/middlewares/auth.middleware';
import { resolver } from '../helpers';
import { visitController } from './index';

const visitRoutes = Router();

visitRoutes
  .post('/visits', resolver(visitController.createVisit))
  .get('/visits', AuthMiddleware(['ADMIN']), resolver(visitController.findAll))
  .get(
    '/visits/badge_exists',
    resolver(visitController.findByStatusBadgeSecretary),
  )
  .get('/visits/all_badges', resolver(visitController.findBadgesBySecretary))
  .get(
    '/visits/by_visitor/:id',
    resolver(visitController.findVisitByStatusAndVisitorId),
  )
  .post('/visits/:id', resolver(visitController.createVisitToVisitor))
  .get('/visits/:id', resolver(visitController.findOne))
  .patch('/visits/:id', resolver(visitController.updateStatus));

export default visitRoutes;
