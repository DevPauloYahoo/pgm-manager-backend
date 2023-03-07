import { prismaClient } from '../../../prisma/config/prisma.client';
import { CreateRoleType } from '../../@types';

const createRole = (role: CreateRoleType) => {
  return prismaClient.role.create({
    data: role,
    select: {
      id: true,
      name: true,
      created_at: true,
      updated_at: true,
    },
  });
};

const getAllRoles = () => {
  return prismaClient.role.findMany();
};

const getOneRole = (roleId: string) => {
  return prismaClient.role.findUnique({ where: { id: roleId } });
};

export { createRole, getOneRole, getAllRoles };
