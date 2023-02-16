import { Request, Response } from 'express';

import { NotFoundError } from '../helpers';
import { createVisitorSchema, visitorService } from './index';

export const saveVisitor = async (req: Request, res: Response) => {
  createVisitorSchema.parse(req.body);

  const visitor = await visitorService.createVisitor(req.body);

  return res.status(201).json(visitor);
};

export const listAll = async (req: Request, res: Response) => {
  const visitors = await visitorService.getAllVisitors();

  return res.status(200).json(visitors);
};

export const findOne = async (req: Request, res: Response) => {
  const { id } = req.params;
  const visitorFound = await visitorService.getOneVisitor(id);

  if (!visitorFound) {
    throw new NotFoundError(`Visitante não encontrado para o ID: ${id}`);
  }

  return res.status(200).json(visitorFound);
};
