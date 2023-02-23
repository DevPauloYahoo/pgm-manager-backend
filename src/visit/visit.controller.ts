import { Request, Response } from 'express';

import { prismaClient } from '../../prisma/config/prisma.client';
import { TypeVisitPaginator } from '../@types';
import { NotFoundError } from '../helpers';
import { visitService } from './index';
import {
  createVisitSchema,
  createVisitToVisitorSchema,
  validationParamsVisitorSchema,
} from './visit.schema';

export const createVisit = async (req: Request, res: Response) => {
  createVisitSchema.parse(req.body);

  const { ...visitDto } = req.body;
  const visit = await visitService.createVisit({
    ...visitDto,
  });

  return res.status(201).json(visit);
};

export const createVisitToVisitor = async (req: Request, res: Response) => {
  validationParamsVisitorSchema.parse(req.params);

  const { id } = req.params;

  createVisitToVisitorSchema.parse(req.body);

  const { ...visitDto } = req.body;
  Reflect.deleteProperty(visitDto, 'visitor_id');

  const newVisit = await visitService.createVisitToVisitor(visitDto, id);

  res.status(201).json(newVisit);
};

export const updateStatus = async (req: Request, res: Response) => {
  validationParamsVisitorSchema.parse(req.params);

  const { id } = req.params;
  const visitFound = await visitService.getOneVisit(id);

  if (!visitFound) {
    throw new NotFoundError(`Atendimento não encontrado para o ID: ${id}`);
  }

  const visitUpdated = await visitService.updateStatus(id);
  return res.status(200).json(visitUpdated);
};

export const findAll = async (req: Request, res: Response) => {
  const search = String(req.query.search || '');
  const status = String(req.query.status || '');
  const page = +(req.query.page as string) || 1;
  const limit = +(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;

  let statusQuery = true;
  if (status === '') {
    statusQuery = false;
  }

  // let status;
  // if (param !== '') status = param.toLowerCase() === 'true';

  const [visits, totalItems] = await prismaClient.$transaction([
    visitService.getAllVisits(search, statusQuery, skip, limit),
    prismaClient.visit.count(),
  ]);

  // const totalPages = Math.ceil(total / limit);
  const visitsResponse: TypeVisitPaginator<object> = {
    content: visits,
    currentPage: page,
    itemsPerPage: limit,
    totalItems,
  };

  return res.status(200).json(visitsResponse);
};

export const findOne = async (req: Request, res: Response) => {
  const { id } = req.params;
  const visitFound = await visitService.getOneVisit(id);

  if (!visitFound) {
    throw new NotFoundError(`Atendimento não encontrado para o ID: ${id}`);
  }

  return res.status(200).json(visitFound);
};

export const findByStatusBadgeSecretary = async (
  req: Request,
  res: Response,
) => {
  const { badge, secretary } = req.query;

  const visitFound = await visitService.findByStatusBadgeSecretary(
    badge as string,
    secretary as string,
  );

  // if (!visitFound) {
  //   return res.status(404).json({ isBadgeExists: false });
  // }

  return res.status(200).json(visitFound);
};
