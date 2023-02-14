import { prismaClient } from '../../../prisma/config/prisma.client';
import { TypeCreateVisitorDto } from '../dto/visitor.dto';

export const createVisitor = ({
  visits,
  ...visitorDto
}: TypeCreateVisitorDto) => {
  return prismaClient.visitor.create({
    data: {
      ...visitorDto,
      visits: {
        create: visits,
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
  });
};

export const getOneVisitor = async (id: string) => {
  return await prismaClient.visitor.findUnique({
    where: { id },
  });
};
