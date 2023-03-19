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

// src/auth/auth.module.ts
var auth_module_exports = {};
__export(auth_module_exports, {
  roleController: () => role_controller_exports,
  roleModel: () => role_model_exports,
  roleSchema: () => role_schema_exports,
  roleService: () => role_service_exports,
  signInController: () => sign_in_controller_exports,
  signInModel: () => sign_in_model_exports,
  signInSchema: () => sign_in_schema_exports,
  userController: () => user_controller_exports,
  userModel: () => user_model_exports,
  userSchema: () => user_schema_exports,
  userService: () => user_service_exports
});
module.exports = __toCommonJS(auth_module_exports);

// src/auth/role/role.controller.ts
var role_controller_exports = {};
__export(role_controller_exports, {
  createRole: () => createRole
});

// src/auth/role/role.schema.ts
var role_schema_exports = {};
__export(role_schema_exports, {
  createRoleSchema: () => createRoleSchema,
  roleSchema: () => roleSchema
});
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

// src/auth/role/role.controller.ts
var createRole = async (req, res) => {
  createRoleSchema.parse(req.body);
  const { ...role } = req.body;
  const roleCreated = await role_service_exports.createRole({ ...role });
  return res.status(200).json(roleCreated);
};

// src/auth/role/role.model.ts
var role_model_exports = {};

// src/auth/role/role.service.ts
var role_service_exports = {};
__export(role_service_exports, {
  createRole: () => createRole2,
  getAllRoles: () => getAllRoles,
  getOneRole: () => getOneRole
});

// prisma/config/prisma.client.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();

// src/auth/role/role.service.ts
var createRole2 = (role) => {
  return prismaClient.role.create({
    data: role,
    select: {
      id: true,
      name: true,
      created_at: true,
      updated_at: true
    }
  });
};
var getAllRoles = () => {
  return prismaClient.role.findMany();
};
var getOneRole = (roleId) => {
  return prismaClient.role.findUnique({ where: { id: roleId } });
};

// src/auth/sign-in/sign-in.controller.ts
var sign_in_controller_exports = {};
__export(sign_in_controller_exports, {
  signIn: () => signIn
});

// src/auth/sign-in/sign-in.service.ts
var import_axios = __toESM(require("axios"));
var BASE_URL = process.env.URL_CONNECT || "";
var signInService = async (username, password) => {
  return await import_axios.default.post(
    BASE_URL,
    new URLSearchParams({
      client_id: process.env.CLIENT_ID || "",
      client_secret: process.env.CLIENT_SECRET || "",
      grant_type: process.env.GRANT_TYPE || "",
      username,
      password
    })
  );
};

// src/auth/sign-in/sign-in.controller.ts
var signIn = async (req, res) => {
  const { username, password } = req.body;
  const { data } = await signInService(username, password);
  res.header("Access-Control-Expose-Headers", [
    "x-access-token",
    "x-refresh-token"
  ]);
  res.set("x-access-token", data.access_token);
  res.set("x-refresh-token", data.refresh_token);
  return res.status(200).json({ message: "Login successful" });
};

// src/auth/sign-in/sign-in.model.ts
var sign_in_model_exports = {};

// src/auth/sign-in/sign-in.schema.ts
var sign_in_schema_exports = {};
__export(sign_in_schema_exports, {
  singInSchema: () => singInSchema
});
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

// src/helpers/errors/api-errors.class.ts
var ApiErrors = class extends Error {
  constructor(message, statusCode, code) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
  }
};

// src/helpers/errors/errors-custom.class.ts
var NotFoundError = class extends ApiErrors {
  constructor(message) {
    super(message, 404);
  }
};

// src/auth/sign-up/user.schema.ts
var user_schema_exports = {};
__export(user_schema_exports, {
  userCreateSchema: () => userCreateSchema,
  userSchema: () => userSchema
});
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

// src/auth/sign-up/user.model.ts
var user_model_exports = {};

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  roleController,
  roleModel,
  roleSchema,
  roleService,
  signInController,
  signInModel,
  signInSchema,
  userController,
  userModel,
  userSchema,
  userService
});
