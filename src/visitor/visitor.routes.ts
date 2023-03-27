import { Router } from 'express';

import { AuthMiddleware } from '../auth/middlewares/auth.middleware';
import { resolver } from '../helpers';
import { visitorController } from '../visitor';

const visitorRoutes = Router();

visitorRoutes
  .post(
    '/visitors',
    AuthMiddleware(['USER', 'ADMIN']),
    resolver(visitorController.saveVisitor),
  )
  .get(
    '/visitors',
    AuthMiddleware(['USER', 'ADMIN', 'GUEST']),
    resolver(visitorController.listAll),
  )
  .get(
    '/visitors/document',
    AuthMiddleware(['USER', 'ADMIN', 'GUEST']),
    resolver(visitorController.findByCPF),
  )
  .get(
    '/visitors/:id',
    AuthMiddleware(['USER', 'ADMIN', 'GUEST']),
    resolver(visitorController.findOne),
  )
  .delete(
    '/visitors/:id',
    AuthMiddleware(['ADMIN']),
    resolver(visitorController.deleteVisitor),
  );

export default visitorRoutes;
