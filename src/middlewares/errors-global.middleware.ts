import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import {AxiosError} from "axios";
import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

import {ApiErrors, errorsValidationZod, UnauthorizedError} from '../helpers';

export const errorsGlobalMiddleware = (
  error: Error & Partial<ApiErrors>,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = error.statusCode ?? 500;
  console.log('STATUS CODE ' + statusCode);
  const message = error.statusCode ? error.message : 'Erro interno no servidor';

  if (error.code === '23505') {
    return res
      .status(400)
      .json({ message: 'Cadastro já existente para o dado informado' });
  }

  if (error instanceof ZodError) {
    return errorsValidationZod(error.issues, res);
  }

  if (error instanceof PrismaClientKnownRequestError) {
    return res.status(401).json({
      message: 'Erro do prisma',
      errorCode: error.code,
      errorMessage: error.message,
    });
  }
  
  if (error instanceof AxiosError) {
    if (error.code === '401'){
      return new UnauthorizedError('Acesso negado')
    }

    if (error.code === '403'){
      return new UnauthorizedError('Usuário não autenticado')
    }
  }

  console.log(error);
  return res.status(statusCode).json({ message: message });
};
