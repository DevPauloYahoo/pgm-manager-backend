import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
} from '@prisma/client/runtime/library';
import { AxiosError } from 'axios';
import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

import { ApiErrors, errorsValidationZod, UnauthorizedError } from '../helpers';

export const errorsGlobalMiddleware = (
  error: Error & Partial<ApiErrors>,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = error.statusCode ?? 500;

  const message = error.statusCode ? error.message : 'Internal Server Error';

  if (error.code === '23505') {
    return res.status(400).json({
      title: 'Bad Request',
      errorCode: 400,
      message: 'existing registration for the given data',
    });
  }

  if (error instanceof ZodError) {
    return errorsValidationZod(error.issues, res);
  }

  if (error instanceof PrismaClientInitializationError) {
    return res.status(500).json({
      title: 'PrismaClientInitializationError',
      errorCode: 500,
      message: 'database connection failed',
    });
  }

  if (error instanceof PrismaClientKnownRequestError) {
    if (error.code === 'P1001') {
      return res.status(500).json({
        title: 'PrismaClientKnownRequestError',
        errorCode: error.code,
        message: 'database connection failed',
      });
    } else if (error.code === 'P2021') {
      return res.status(500).json({
        title: 'PrismaClientKnownRequestError',
        errorCode: error.code,
        message: 'Table does not exist in the database',
      });
    } else {
      return res.status(500).json({
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
        message: 'database connection failed',
      });
    }

    if (error.code === 'ENOTFOUND') {
      return res.status(500).json({
        title: 'KeycloakConnectionError',
        errorCode: 500,
        message: 'keycloak offline',
      });
    }

    if (error.code === 'ERR_BAD_REQUEST') {
      if (error.response?.data.error === 'invalid_grant') {
        return res.status(401).json({
          title: 'Bad Request',
          errorCode: 401,
          message: 'invalid_grant',
        });
      }

      if (error.response?.data.error === 'unauthorized_client') {
        return res.status(401).json({
          title: 'Bad Request',
          errorCode: 401,
          message: 'unauthorized_client',
        });
      }
    }

    if (error.code === '403') {
      return new UnauthorizedError('unauthorized user');
    }
  }

  console.log('STACK TRACE', error);
  return res.status(statusCode).json({ message: message });
};
