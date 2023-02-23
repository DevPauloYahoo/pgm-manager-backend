import { Request, Response } from 'express';

import { prismaClient } from '../../prisma/config/prisma.client';
import { TypeIsExistsCPF, TypeVisitorPaginator } from '../@types';
import { NotFoundError } from '../helpers';
import {
  createVisitorSchema,
  createVisitorWithVisitSchema,
  validationCPFNumber,
  validationCPFString,
  VisitorDto,
  visitorService,
} from './index';

export const saveVisitor = async (req: Request, res: Response) => {
  const { visit } = req.body;

  if (visit) {
    createVisitorWithVisitSchema.parse(req.body);
  } else {
    createVisitorSchema.parse(req.body);
  }

  const visitor = await visitorService.createVisitor(req.body);

  return res.status(201).json(visitor);
};

export const listAll = async (req: Request, res: Response) => {
  const search = String(req.query.search || '');
  const page = +(req.query.page as string) || 1;
  const limit = +(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;

  const [visitors, totalItems] = await prismaClient.$transaction([
    visitorService.getAllVisitors(search, skip, limit),
    prismaClient.visitor.count(),
  ]);

  // const totalPages: number = Math.ceil(total / limit);

  const visitorResponse: TypeVisitorPaginator<VisitorDto> = {
    content: visitors,
    currentPage: page,
    itemsPerPage: limit,
    totalItems,
  };

  return res.status(200).json(visitorResponse);
};

export const findOne = async (req: Request, res: Response) => {
  const { id } = req.params;
  const visitorFound = await visitorService.getOneVisitor(id);

  if (!visitorFound) {
    throw new NotFoundError(`Visitante não encontrado para o ID: ${id}`);
  }

  return res.status(200).json(visitorFound);
};

export const findByCPF = async (req: Request, res: Response) => {
  const cpfParam = String(req.query.cpf || '');

  validationCPFNumber.parse(+cpfParam);
  validationCPFString.parse(cpfParam);

  const visitorFound: TypeIsExistsCPF = await visitorService.findByCPF(
    cpfParam,
  );

  // if (!visitorFound) {
  //   throw new NotFoundError('Não encontrado')
  // }

  return res.status(200).json(visitorFound);
};
