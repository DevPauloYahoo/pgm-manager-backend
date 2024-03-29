import { Request, Response } from 'express';

import { prismaClient } from '../../prisma/config/prisma.client';
import {
  TypeVisitByBadgeResponse,
  TypeVisitByVisitorResponse,
  TypeVisitPaginator,
} from '../@types';
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

  const visitStatusUpdated = await visitService.updateStatus(id);

  const dateInitial = new Date(visitStatusUpdated.updated_at);
  const dateEnd = new Date(visitStatusUpdated.created_at);
  const dateDiff = Math.abs(dateEnd.getTime() - dateInitial.getTime());
  const duration = Math.ceil(dateDiff / 60000);

  const visitUpdated = visitService.updateDuration(id, duration);

  return res.status(200).json(visitUpdated);
};

export const findAll = async (req: Request, res: Response) => {
  const { query } = req;
  const search = query.search as string;
  
  let status = false;
  if (query.status === 'true') {
      status = !status;
  }
  
  const page = +(query.page as string) || 1;
  const limit = +(query.limit as string) || 10;
  const skip = (page - 1) * limit;

  const [visits, totalItems] = await prismaClient.$transaction([
    visitService.getAllVisits(search, status, skip, limit),
    prismaClient.visit.count(),
  ]);

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
): Promise<Response<TypeVisitByBadgeResponse>> => {
  const { badge, secretary } = req.query;

  const visitFound = await visitService.getByStatusBadgeSecretary(
    badge as string,
    secretary as string,
  );

  if (!visitFound) {
    return res
      .status(200)
      .json({ statusVisit: false, visitId: '', badgeVisit: '' });
  }

  return res.status(200).json({
    statusVisit: true,
    visitId: visitFound.id,
    badgeVisit: visitFound.badge,
  });
};

export const findVisitByStatusAndVisitorId = async (
  req: Request,
  res: Response,
): Promise<Response<TypeVisitByVisitorResponse>> => {
  const visitorId = req.params.id;

  const visitFound = await visitService.getByStatusAndVisitorId(visitorId);

  if (!visitFound) {
    return res.status(200).json({
      status: false,
      visitorName: '',
      secretaryName: '',
      badgeNumber: '',
    });
  }

  const { visitor, secretary, badge } = visitFound;

  return res.status(200).json({
    status: true,
    visitorName: visitor?.name,
    secretaryName: secretary,
    badgeNumber: badge,
  });
};

export const findBadgesBySecretary = async (req: Request, res: Response) => {
  const { secretary } = req.query;

  const badgesFound = await visitService.getBadgesBySecretary(
    secretary as string,
  );

  if (!badgesFound) {
    res.status(200).json({ badgesFound: [] });
  }

  const results: string[] = [];

  badgesFound.forEach((value: any) => results.push(value.badge));

  return res.status(200).json(results);
};
