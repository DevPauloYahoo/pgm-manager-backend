import { Request, Response } from 'express';

import { singInSchema } from './sign-in.schema';

export const signIn = async (req: Request, res: Response) => {
  singInSchema.parse(req.body);

  const { email, password } = req.body;

  res.status(200).json({ email: email, password: password });
};
