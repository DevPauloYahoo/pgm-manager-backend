import { Request, Response } from 'express';

import { visitService } from './index';

export const createVisit = async (req: Request, res: Response) => {
  const { ...visitDto } = req.body;
  const visit = await visitService.createVisit({
    ...visitDto,
  });
  return res.status(201).json(visit);
};

export const findAll = async (req: Request, res: Response) => {
  const visits = await visitService.getAllVisits();
  return res.status(200).json(visits);
};
