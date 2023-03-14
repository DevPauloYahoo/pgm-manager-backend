import cors from 'cors';
import express from 'express';
import morgan from 'morgan';

import roleRoutes from './auth/role/role.routes';
import signInRoutes from './auth/sign-in/sign-in.routes';
import signUpRoutes from './auth/sign-up/sign-up.routes';
import { errorsGlobalMiddleware } from './middlewares';
import visitRoutes from './visit/visit.routes';
import visitorRoutes from './visitor/visitor.routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());

app.use('/api', [
  visitorRoutes,
  visitRoutes,
  signUpRoutes,
  signInRoutes,
  roleRoutes,
]);
app.use(errorsGlobalMiddleware);

export default app;
