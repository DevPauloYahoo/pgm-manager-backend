import { Router } from 'express';

import { visitorController } from '../visitor';

const visitorRoutes = Router();

visitorRoutes
  .post('/visitors', visitorController.saveVisitor)
  .get('/visitors', visitorController.listAll)
  .get('/visitors/:id', visitorController.findOne);

export default visitorRoutes;
