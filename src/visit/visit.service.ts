import { prismaClient } from '../../prisma/config/prisma.client';
import { TypeCreateVisit } from '../@types';

export const createVisit = (visitDto: TypeCreateVisit) => {
  return prismaClient.visit.create({
    data: visitDto,
    select: {
      id: true,
      badge: true,
      secretary: true,
      visitor: {
        select: {
          id: true,
          name: true,
          document: true,
        },
      },
    },
  });
};

export const createVisitToVisitor = (
  visitDto: TypeCreateVisit,
  visitorId: string,
) => {
  return prismaClient.visit.create({
    data: {
      ...visitDto,
      visitor_id: visitorId,
    },
    select: {
      id: true,
      badge: true,
      secretary: true,
      visitor: {
        select: {
          id: true,
          name: true,
          document: true,
        },
      },
    },
  });
};

export const updateStatus = async (id: string) => {
  return prismaClient.visit.update({
    where: { id },
    data: { status: true },
  });
};

export const getAllVisits = (
  status: boolean | undefined,
  skip: number,
  limit: number,
) => {
  return prismaClient.visit.findMany({
    select: {
      id: true,
      badge: true,
      status: true,
      secretary: true,
      created_at: true,
      updated_at: true,
      visitor: {
        select: {
          id: true,
          name: true,
          document: true,
        },
      },
    },
    where: { status },
    orderBy: {
      created_at: 'desc',
    },
    skip,
    take: limit,
  });
};

export const getOneVisit = (id: string) => {
  return prismaClient.visit.findUnique({
    where: { id },
  });
};
