import { Request, Response } from 'express';

import { signInService } from './sign-in.service';

export const signIn = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const result = await signInService(username, password);

  return res.status(200).json(result.data);
};
