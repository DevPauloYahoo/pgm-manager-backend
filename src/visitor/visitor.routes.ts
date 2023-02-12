import { Router } from 'express';

import { visitorController } from '../visitor';

const visitorRoutes = Router();

visitorRoutes
  .post('/visitors', visitorController.saveVisitor)
  .get('/visitors', visitorController.listAll);

export default visitorRoutes;
