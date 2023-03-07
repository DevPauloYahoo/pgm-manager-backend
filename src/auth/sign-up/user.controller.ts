import { hashSync } from 'bcrypt';
import { Request, Response } from 'express';

import { NotFoundError } from '../../helpers';
import { userService } from '../auth.module';
import { userCreateSchema } from './user.schema';

export const signUp = async (req: Request, res: Response) => {
  userCreateSchema.parse(req.body);

  const { name, email, password, roles } = req.body;

  const passwordEncrypted = hashSync(password, 10);

  const userFound = await userService.getUserByEmail(email);

  if (userFound) {
    throw new NotFoundError(`Usuário com email: (${email}) já existe`);
  }

  const result = await userService.signUp({
    name,
    email,
    password: passwordEncrypted,
    roles,
  });

  return res.status(201).json(result);
};
