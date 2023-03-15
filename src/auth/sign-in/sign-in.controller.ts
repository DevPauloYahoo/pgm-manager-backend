import { Request, Response } from 'express';

import { signInService } from './sign-in.service';

export const signIn = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const { data } = await signInService(username, password);

  res.header('Access-Control-Expose-Headers', [
    'x-access-token',
    'x-refresh-token',
  ]);

  res.set('x-access-token', data.access_token);
  res.set('x-refresh-token', data.refresh_token);

  return res.status(200).json({ message: 'Login successful' });
};
