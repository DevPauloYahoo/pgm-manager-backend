import cors from 'cors';
import express from 'express';
import morgan from 'morgan';

import visitRoutes from './visit/visit.routes';
import { visitorRoutes } from './visitor';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());

app.use([visitorRoutes, visitRoutes]);

export default app;
