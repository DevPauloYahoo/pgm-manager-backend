import { Request, Response } from 'express';

import { visitService } from './index';

export const saveVisit = async (req: Request, res: Response) => {
  const visit = await visitService.createVisit(req.body);
  return res.status(201).json(visit);
};

export const findAll = async (req: Request, res: Response) => {
  const visits = await visitService.getAllVisits();
  return res.status(200).json(visits);
};
