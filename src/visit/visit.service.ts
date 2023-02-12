import { PrismaClient } from '@prisma/client';

import { createVisitDto } from './visit.dto';

const prisma = new PrismaClient();

export const createVisit = (visitDto: createVisitDto) => {
  return prisma.visit.create({
    data: {
      badge: visitDto.badge,
      secretary: visitDto.secretary,
      visitor: {
        connect: {
          id: visitDto.visitor_id,
        },
      },
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

export const getAllVisits = () => {
  return prisma.visit.findMany({
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
