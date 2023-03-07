import { Router } from 'express';

import { resolver } from '../../helpers';
import { userController } from '../auth.module';

const signUpRoutes = Router();

signUpRoutes.post('/users/sign-up', resolver(userController.signUp));

export default signUpRoutes;
