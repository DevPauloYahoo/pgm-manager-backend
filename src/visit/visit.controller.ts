import { Request, Response } from 'express';

import { NotFoundError } from '../helpers';
import { visitService } from './index';

export const createVisit = async (req: Request, res: Response) => {
  const { ...visitDto } = req.body;
  const visit = await visitService.createVisit({
    ...visitDto,
  });
  return res.status(201).json(visit);
};

export const createVisitoToVisitor = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ...visitDto } = req.body;
  Reflect.deleteProperty(visitDto, 'visitor_id');

  const newVisit = await visitService.createVisitToVisitor(visitDto, id);

  res.status(201).json(newVisit);
};

export const updateStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const visitFound = await visitService.getOneVisit(id);

  if (!visitFound) {
    throw new NotFoundError(`Atendimento não encontrado para o ID: ${id}`);
  }

  const visitUpdated = await visitService.updateStatus(id);
  return res.status(200).json(visitUpdated);
};

export const findAll = async (req: Request, res: Response) => {
  const visits = await visitService.getAllVisits();
  return res.status(200).json(visits);
};

export const findOne = async (req: Request, res: Response) => {
  const { id } = req.params;
  const visitFound = await visitService.getOneVisit(id);

  if (!visitFound) {
    throw new NotFoundError(`Atendimento não encontrado para o ID: ${id}`);
  }
  return res.status(200).json(visitFound);
};
