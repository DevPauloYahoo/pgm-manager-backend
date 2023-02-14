import { prismaClient } from '../../prisma/config/prisma.client';
import { createVisitDto } from './visit.dto';

export const createVisit = (visitDto: createVisitDto) => {
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

export const getAllVisits = () => {
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
    where: { status: false },
  });
};
