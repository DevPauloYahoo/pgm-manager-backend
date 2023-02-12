import { PrismaClient } from '@prisma/client';

import { createVisitorDto } from '../dto/visitor.dto';

const prisma = new PrismaClient();

export const createVisitor = ({ name, document, visit }: createVisitorDto) => {
  console.log(visit);
  return prisma.visitor.create({
    data: {
      name,
      document,
      visits: {
        create: [visit],
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

export const getAllVisitors = () => {
  return prisma.visitor.findMany({
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
          created_at: true,
          updated_at: true,
        },
      },
    },
  });
};
