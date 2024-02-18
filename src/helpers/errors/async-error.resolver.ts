import { Handler, NextFunction, Request, Response } from 'express';

const resolver =  (handleFn: Handler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      return await Promise.resolve(handleFn(req, res, next));
    } catch (err) {
      return next(err);
    }
  };
};

export { resolver };
