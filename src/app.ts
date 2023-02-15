import cors from 'cors';
import express from 'express';
import morgan from 'morgan';

import { errorsGlobalMiddleware } from './middlewares';
import visitRoutes from './visit/visit.routes';
import visitorRoutes from './visitor/visitor.routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());

app.use('/api', [visitorRoutes, visitRoutes]);
app.use(errorsGlobalMiddleware);

export default app;
