import { Router } from 'express';

import { visitController } from './index';

const visitRoutes = Router();

visitRoutes
  .post('/visits', visitController.saveVisit)
  .get('/visits', visitController.findAll);

export default visitRoutes;
