import { Request, Response } from 'express';

import { signInService } from './sign-in.service';

export interface tokenResponse {
  access_token: string;
  refresh_token: string;
}

export const signIn = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const { data } = await signInService(username, password);

  const token: tokenResponse = {
    access_token: data.access_token,
    refresh_token: data.refresh_token,
  };

  res.header('Access-Control-Expose-Headers', 'x-access-token');
  res.set('x-access-token', JSON.stringify(token));

  return res.status(200).json({ message: 'Login successful' });
};
