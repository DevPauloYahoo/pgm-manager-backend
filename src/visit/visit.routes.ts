import { Router } from 'express';

import { visitController } from './index';

const visitRoutes = Router();

visitRoutes
  .post('/visits', visitController.createVisit)
  .get('/visits', visitController.findAll);

export default visitRoutes;
