import { Router } from 'express';

import { resolver } from '../../helpers';
import { signInController } from '../auth.module';

const signInRoutes = Router();

signInRoutes.post('/users/sign-in', resolver(signInController.signIn));

export default signInRoutes;
