import { Response } from 'express';
import { ZodIssue } from 'zod';

import { ErrorsZod } from '../../@types/errors-zod';
import { BadRequestValidationZod } from './errors-custom.class';

export const errorsValidationZod = (errorsZod: ZodIssue[], res: Response) => {
  const resZod: ErrorsZod[] = [];
  errorsZod.forEach((error) => {
    resZod.push({ message: error.message, path: error.path });
  });

  return new BadRequestValidationZod(resZod, res);
};
