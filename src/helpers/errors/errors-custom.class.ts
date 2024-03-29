import { Response } from 'express';

import { ErrorsZod } from '../../@types';
import { ApiErrors } from './api-errors.class';

export class BadRequestError extends ApiErrors {
  constructor(message: string) {
    super(message, 400);
  }
}

export class BadRequestValidationZod {
  constructor(data: ErrorsZod[], res: Response) {
    return res.status(400).json(data);
  }
}

export class NotFoundError extends ApiErrors {
  constructor(message: string) {
    super(message, 404);
  }
}

export class UnauthenticatedError extends ApiErrors {
  constructor(message: string) {
    super(message, 401);
  }
}

export class UnauthorizedError extends ApiErrors {
  constructor(message: string) {
    super(message, 403);
  }
}
