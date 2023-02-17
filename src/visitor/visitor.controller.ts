import { Request, Response } from 'express';

import { prismaClient } from '../../prisma/config/prisma.client';
import { NotFoundError } from '../helpers';
import { createVisitorSchema, visitorService } from './index';

export const saveVisitor = async (req: Request, res: Response) => {
  createVisitorSchema.parse(req.body);

  const visitor = await visitorService.createVisitor(req.body);

  return res.status(201).json(visitor);
};

export const listAll = async (req: Request, res: Response) => {
  const search = String(req.query.search || '');
  const page = +(req.query.page as string) || 1;
  const limit = +(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;

  const [visitors, total] = await prismaClient.$transaction([
    visitorService.getAllVisitors(search, skip, limit),
    prismaClient.visitor.count(),
  ]);

  const totalPages = Math.ceil(total / limit);
  const lastPage: boolean = page === totalPages;
  const firstPage: boolean = page === 1;

  return res.status(200).json({
    total,
    totalPages,
    currentPage: page,
    itemPerPage: limit,
    firstPage,
    lastPage,
    data: visitors,
  });
};

export const findOne = async (req: Request, res: Response) => {
  const { id } = req.params;
  const visitorFound = await visitorService.getOneVisitor(id);

  if (!visitorFound) {
    throw new NotFoundError(`Visitante não encontrado para o ID: ${id}`);
  }

  return res.status(200).json(visitorFound);
};
