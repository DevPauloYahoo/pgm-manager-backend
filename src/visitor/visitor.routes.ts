import { Router } from 'express';

import { resolver } from '../helpers';
import { visitorController } from '../visitor';

const visitorRoutes = Router();

visitorRoutes
  .post('/visitors', resolver(visitorController.saveVisitor))
  .get(
    '/visitors', resolver(visitorController.listAll),
  )
  .get('/visitors/document', resolver(visitorController.findByCPF))
  .get('/visitors/:id', resolver(visitorController.findOne));

export default visitorRoutes;
