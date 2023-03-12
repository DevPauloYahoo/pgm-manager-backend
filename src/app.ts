import cors from 'cors';
import express from 'express';
import morgan from 'morgan';

// import jwtStrategy from './auth/passport.config';
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

// app.use(passport.initialize());
// @ts-ignore
// passport.use('jwt', );

app.use('/api', [
  visitorRoutes,
  visitRoutes,
  signUpRoutes,
  signInRoutes,
  roleRoutes,
]);
app.use(errorsGlobalMiddleware);

export default app;
