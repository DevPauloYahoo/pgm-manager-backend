import { Handler, NextFunction, Request, Response } from 'express';

const resolver = (handleFn: Handler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(handleFn(req, res, next)).catch((err) => next(err));
  };
};

export { resolver };
