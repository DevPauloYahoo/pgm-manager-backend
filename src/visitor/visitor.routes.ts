import { Router } from 'express';

import { AuthMiddleware } from '../auth/middlewares/auth.middleware';
import { resolver } from '../helpers';
import { visitorController } from '../visitor';

const visitorRoutes = Router();

visitorRoutes
  .post('/visitors', resolver(visitorController.saveVisitor))
  .get(
    '/visitors',
    AuthMiddleware(['ADMIN', 'USER']),
    resolver(visitorController.listAll),
  )
  .get('/visitors/document', resolver(visitorController.findByCPF))
  .get('/visitors/:id', resolver(visitorController.findOne));

export default visitorRoutes;
