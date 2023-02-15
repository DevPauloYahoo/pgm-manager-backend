import { Router } from 'express';

import { resolver } from '../helpers';
import { visitController } from './index';

const visitRoutes = Router();

visitRoutes
  .post('/visits', resolver(visitController.createVisit))
  .get('/visits', resolver(visitController.findAll))
  .post('/visits/:id', resolver(visitController.createVisitoToVisitor))
  .get('/visits/:id', resolver(visitController.findOne))
  .patch('/visits/:id', resolver(visitController.updateStatus));

export default visitRoutes;
