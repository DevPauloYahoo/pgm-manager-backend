import { Router } from 'express';

import { resolver } from '../../helpers';
import { roleController } from '../auth.module';

const roleRoutes = Router();

roleRoutes.post('/users/roles', resolver(roleController.createRole));

export default roleRoutes;
