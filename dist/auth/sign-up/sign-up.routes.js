"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/auth/sign-up/sign-up.routes.ts
var sign_up_routes_exports = {};
__export(sign_up_routes_exports, {
  default: () => sign_up_routes_default
});
module.exports = __toCommonJS(sign_up_routes_exports);
var import_express = require("express");

// src/helpers/errors/api-errors.class.ts
var ApiErrors = class extends Error {
  constructor(message, statusCode, code) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
  }
};

// src/helpers/errors/async-error.resolver.ts
var resolver = (handleFn) => {
  return (req, res, next) => {
    return Promise.resolve(handleFn(req, res, next)).catch((err) => next(err));
  };
};

// src/helpers/errors/errors-custom.class.ts
var NotFoundError = class extends ApiErrors {
  constructor(message) {
    super(message, 404);
  }
};

// src/auth/role/role.schema.ts
var import_zod = require("zod");
var rolesEnum = {
  ADMIN: "ROLE_ADMIN",
  USER: "ROLE_USER",
  GUEST: "ROLE_GUEST"
};
var createRoleSchema = import_zod.z.object({
  name: import_zod.z.nativeEnum(rolesEnum, {
    invalid_type_error: "Dados incorretos",
    required_error: "Nome \xE9 obrigat\xF3rio"
  })
  // users: z.array(userSchema).optional(),
});
var roleSchema = import_zod.z.object({
  // id: z.string().uuid('ID com formato incorreto').optional(),
  name: import_zod.z.nativeEnum(rolesEnum, {
    invalid_type_error: "Dados incorretos",
    required_error: "Nome \xE9 obrigat\xF3rio"
  })
});

// prisma/config/prisma.client.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();

// src/auth/sign-in/sign-in.service.ts
var import_axios = __toESM(require("axios"));
var BASE_URL = process.env.URL_CONNECT || "";

// src/auth/sign-in/sign-in.schema.ts
var import_zod2 = require("zod");
var singInSchema = import_zod2.z.object({
  email: import_zod2.z.string({ required_error: "Email \xE9 obrigat\xF3rio" }).min(1, "Email \xE9 obrigat\xF3rio").email("Email inv\xE1lido"),
  password: import_zod2.z.string({ required_error: "Senha \xE9 obrigat\xF3rio" }).min(1, "Senha \xE9 obrigat\xF3rio")
});

// src/auth/sign-up/user.controller.ts
var user_controller_exports = {};
__export(user_controller_exports, {
  signUp: () => signUp
});
var import_bcrypt = require("bcrypt");

// src/auth/sign-up/user.schema.ts
var import_zod3 = require("zod");
var userCreateSchema = import_zod3.z.object({
  name: import_zod3.z.string({ required_error: "Nome \xE9 obrigat\xF3rio" }).min(1, "Nome \xE9 obrigat\xF3rio").min(6, "Nome deve ter no m\xEDnimo 6 caracteres"),
  email: import_zod3.z.string({ required_error: "Email \xE9 obrigat\xF3rio" }).min(1, "Email \xE9 obrigat\xF3rio").email("Email inv\xE1lido"),
  password: import_zod3.z.string({ required_error: "Senha \xE9 obrigat\xF3rio" }).min(1, "Senha \xE9 obrigat\xF3rio").min(6, "deve ter no m\xEDnimo 6 caracteres"),
  roles: import_zod3.z.array(roleSchema).optional()
});
var userSchema = import_zod3.z.object({
  id: import_zod3.z.string().uuid("ID com formato incorreto").optional(),
  name: import_zod3.z.string({ required_error: "Nome \xE9 obrigat\xF3rio" }).min(1, "Nome \xE9 obrigat\xF3rio").min(6, "Nome deve ter no m\xEDnimo 6 caracteres"),
  email: import_zod3.z.string({ required_error: "Email \xE9 obrigat\xF3rio" }).min(1, "Email \xE9 obrigat\xF3rio").email("Email inv\xE1lido"),
  password: import_zod3.z.string({ required_error: "Senha \xE9 obrigat\xF3rio" }).min(1, "Senha \xE9 obrigat\xF3rio").min(6, "deve ter no m\xEDnimo 6 caracteres"),
  roles: import_zod3.z.array(roleSchema).optional()
});

// src/auth/sign-up/user.controller.ts
var signUp = async (req, res) => {
  userCreateSchema.parse(req.body);
  const { name, email, password, roles } = req.body;
  const passwordEncrypted = (0, import_bcrypt.hashSync)(password, 10);
  const userFound = await user_service_exports.getUserByEmail(email);
  if (userFound) {
    throw new NotFoundError(`Usu\xE1rio com email: (${email}) j\xE1 existe`);
  }
  const result = await user_service_exports.signUp({
    name,
    email,
    password: passwordEncrypted,
    roles
  });
  return res.status(201).json(result);
};

// src/auth/sign-up/user.service.ts
var user_service_exports = {};
__export(user_service_exports, {
  getUserByEmail: () => getUserByEmail,
  signUp: () => signUp2
});
var signUp2 = async ({
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

// src/auth/sign-up/sign-up.routes.ts
var signUpRoutes = (0, import_express.Router)();
signUpRoutes.post("/users/sign-up", resolver(user_controller_exports.signUp));
var sign_up_routes_default = signUpRoutes;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
