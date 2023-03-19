"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/auth/sign-up/user.service.ts
var user_service_exports = {};
__export(user_service_exports, {
  getUserByEmail: () => getUserByEmail,
  signUp: () => signUp
});
module.exports = __toCommonJS(user_service_exports);

// prisma/config/prisma.client.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();

// src/auth/sign-up/user.service.ts
var signUp = async ({
  name,
  email,
  password,
  roles
}) => {
  let userCreated;
  if (roles) {
    for (const role of roles) {
      userCreated = await prismaClient.usersToRoles.create({
        data: {
          role: {
            connectOrCreate: {
              where: {
                name: role.name
              },
              create: {
                name: role.name
              }
            }
          },
          user: {
            connectOrCreate: {
              where: {
                email
              },
              create: {
                name,
                email,
                password
              }
            }
          }
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
                      name: true
                    }
                  }
                }
              }
            }
          }
        }
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
                  name: "ROLE_USER"
                },
                create: {
                  name: "ROLE_USER"
                }
              }
            }
          }
        }
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
                name: true
              }
            }
          }
        }
      }
    });
  }
  return userCreated;
};
var getUserByEmail = (email) => {
  return prismaClient.user.findFirst({
    where: {
      email
    }
  });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getUserByEmail,
  signUp
});
