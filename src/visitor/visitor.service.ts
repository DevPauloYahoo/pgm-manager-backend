import { prismaClient } from '../../prisma/config/prisma.client';
import { TypeCreateVisitor } from '../@types';

export const createVisitor = ({ visit, ...visitorDto }: TypeCreateVisitor) => {
  return prismaClient.visitor.create({
    data: {
      ...visitorDto,
      visits: {
        create: visit,
      },
    },
    select: {
      id: true,
      name: true,
      visits: {
        select: {
          id: true,
          badge: true,
          secretary: true,
          status: true,
        },
      },
    },
  });
};

export const getAllVisitors = (search: string, skip: number, limit: number) => {
  return prismaClient.visitor.findMany({
    select: {
      id: true,
      name: true,
      document: true,
      visits: {
        select: {
          id: true,
          badge: true,
          secretary: true,
          status: true,
        },
      },
    },
    where: {
      OR: [
        {
          name: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          document: {
            contains: search,
            mode: 'insensitive',
          },
        },
      ],
    },
    orderBy: {
      name: 'asc',
    },
    skip,
    take: limit,
  });
};

export const getOneVisitor = (id: string) => {
  return prismaClient.visitor.findUnique({
    where: { id },
  });
};

export const findByCPF = (document: string) => {
  return prismaClient.visitor.findFirst({
    where: { document },
    select: { document: true },
  });
};
