import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
} from '@prisma/client/runtime/library';
import { AxiosError } from 'axios';
import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

import {
  ApiErrors,
  errorsValidationZod,
  UnauthenticatedError,
  UnauthorizedError,
} from '../helpers';

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

  if (error instanceof PrismaClientInitializationError) {
    return res.status(500).json({
      title: 'PrismaClientInitializationError',
      errorCode: error.errorCode,
      message: 'Erro na base de dados',
    });
  }

  if (error instanceof PrismaClientKnownRequestError) {
    if (error.code === '1001') {
      return res.status(500).json({
        title: 'PrismaClientKnownRequestError',
        errorCode: error.code,
        message: 'Conexão com banco de dados falhou',
      });
    } else {
      return res.status(401).json({
        title: 'PrismaClientKnownRequestError',
        errorCode: error.code,
        message: error.message,
      });
    }
  }

  if (error instanceof AxiosError) {
    if (error.code === 'ECONNREFUSED') {
      return res.status(500).json({
        title: 'KeycloakConnectionError',
        errorCode: 500,
        message: 'Conexão com banco de dados falhou',
      });
    }

    if (error.code === 'ERR_BAD_REQUEST') {
      return res.status(400).json({ message: 'Credenciais inválidas' });
    }

    if (error.code === '401') {
      return new UnauthenticatedError('Usuário autenticado');
    }

    if (error.code === '403') {
      return new UnauthorizedError('Usuário não autorizado');
    }
  }

  console.log('STACK TRACE', error);
  return res.status(statusCode).json({ message: message });
};
