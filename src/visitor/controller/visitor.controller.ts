import { Request, Response } from 'express';

import { visitorService } from '../index';

export const saveVisitor = async (req: Request, res: Response) => {
  const visitor = await visitorService.createVisitor(req.body);
  return res.status(201).json(visitor);
};

export const listAll = async (req: Request, res: Response) => {
  const visitors = await visitorService.getAllVisitors();
  return res.status(200).json(visitors);
};

export const findOne = async (req: Request, res: Response) => {
  const visitor = await visitorService.getOneVisitor(req.params['id']);
  if (!visitor) {
    return res.status(404).json({ message: 'Visitante não encontrado' });
  }
  return res.status(200).json(visitor);
};
