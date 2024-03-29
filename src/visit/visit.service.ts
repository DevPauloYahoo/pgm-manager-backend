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

export const updateStatus = async (visitId: string) => {
  return prismaClient.visit.update({
    where: { id: visitId },
    data: { status: true },
  });
};

export const updateDuration = async (visitId: string, duration: number) => {
  return prismaClient.visit.update({
    where: { id: visitId },
    data: { duration },
  });
};

export const getAllVisits = (
  search: string,
  status: string | boolean,
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
      duration: true,
      visitor: {
        select: {
          id: true,
          name: true,
          document: true,
        },
      },
    },
    where: {
      status: status as boolean,
      AND: {
        visitor: {
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
      },
    },
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

export const getByStatusBadgeSecretary = (badge: string, secretary: string) => {
  return prismaClient.visit.findFirst({
    where: {
      status: false,
      badge,
      secretary,
    },
    select: {
      id: true,
      badge: true,
    },
  });
};

export async function getByStatusAndVisitorId(visitorId: string) {
  return prismaClient.visit.findFirst({
    where: {
      status: false,
      visitor: {
        id: visitorId,
      },
    },
    select: {
      secretary: true,
      badge: true,
      visitor: {
        select: {
          name: true,
        },
      },
    },
  });
}

export const getBadgesBySecretary = (secretary: string) =>
  prismaClient.visit.findMany({
    where: {
      status: false,
      secretary,
    },
    select: {
      badge: true,
    },
  });
