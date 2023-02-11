import { Router } from 'express';

import { VisitorController } from './controllers/visitor.controller';

const routes = Router();

routes
  .post('/visitors', new VisitorController().create)
  .get('/visitors', new VisitorController().listAll);

export default routes;
