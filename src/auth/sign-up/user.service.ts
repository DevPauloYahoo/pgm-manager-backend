import { prismaClient } from '../../../prisma/config/prisma.client';
import { CreateUserType } from '../../@types/user.type';

export const signUp = async ({
  name,
  email,
  password,
  roles,
}: CreateUserType) => {
  let userCreated;
  if (roles) {
    for (const role of roles) {
      userCreated = await prismaClient.usersToRoles.create({
        data: {
          role: {
            connectOrCreate: {
              where: {
                name: role.name,
              },
              create: {
                name: role.name,
              },
            },
          },
          user: {
            connectOrCreate: {
              where: {
                email,
              },
              create: {
                name,
                email,
                password,
              },
            },
          },
        },
        select: {
          user: {
            select: {
              id: true,
              email: true,
              created_at: true,
              updated_at: true,
              roles: {
                select: {
                  role: {
                    select: {
                      id: true,
                      name: true,
                    },
                  },
                },
              },
            },
          },
        },
      });
    }
  } else {
    userCreated = await prismaClient.user.create({
      data: {
        name,
        email,
        password,
        roles: {
          create: {
            role: {
              connectOrCreate: {
                where: {
                  name: 'ROLE_USER',
                },
                create: {
                  name: 'ROLE_USER',
                },
              },
            },
          },
        },
      },
      select: {
        id: true,
        email: true,
        created_at: true,
        updated_at: true,
        roles: {
          select: {
            role: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });
  }
  return userCreated;
};

export const getUserByEmail = (email: string) => {
  return prismaClient.user.findFirst({
    where: {
      email,
    },
  });
};
