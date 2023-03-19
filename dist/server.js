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

// src/server.ts
var import_config = require("dotenv/config");

// src/app.ts
var import_cors = __toESM(require("cors"));
var import_express6 = __toESM(require("express"));
var import_morgan = __toESM(require("morgan"));

// src/auth/role/role.routes.ts
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
var UnauthorizedError = class extends ApiErrors {
  constructor(message) {
    super(message, 401);
  }
};
var BadRequestValidationZod = class {
  constructor(data, res) {
    return res.status(400).json(data);
  }
};

// src/helpers/errors/errors-validation-zod.ts
var errorsValidationZod = (errorsZod, res) => {
  const resZod = [];
  errorsZod.forEach((error) => {
    resZod.push({ message: error.message, path: error.path });
  });
  return new BadRequestValidationZod(resZod, res);
};

// src/auth/role/role.controller.ts
var role_controller_exports = {};
__export(role_controller_exports, {
  createRole: () => createRole
});

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

// src/auth/role/role.controller.ts
var createRole = async (req, res) => {
  createRoleSchema.parse(req.body);
  const { ...role } = req.body;
  const roleCreated = await role_service_exports.createRole({ ...role });
  return res.status(200).json(roleCreated);
};

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

// src/auth/role/role.routes.ts
var roleRoutes = (0, import_express.Router)();
roleRoutes.post("/users/roles", resolver(role_controller_exports.createRole));
var role_routes_default = roleRoutes;

// src/auth/sign-in/sign-in.routes.ts
var import_express2 = require("express");
var signInRoutes = (0, import_express2.Router)();
signInRoutes.post("/users/sign-in", resolver(sign_in_controller_exports.signIn));
var sign_in_routes_default = signInRoutes;

// src/auth/sign-up/sign-up.routes.ts
var import_express3 = require("express");
var signUpRoutes = (0, import_express3.Router)();
signUpRoutes.post("/users/sign-up", resolver(user_controller_exports.signUp));
var sign_up_routes_default = signUpRoutes;

// src/middlewares/errors-global.middleware.ts
var import_library = require("@prisma/client/runtime/library");
var import_axios2 = require("axios");
var import_zod4 = require("zod");
var errorsGlobalMiddleware = (error, req, res, next) => {
  const statusCode = error.statusCode ?? 500;
  console.log("STATUS CODE " + statusCode);
  const message = error.statusCode ? error.message : "Erro interno no servidor";
  if (error.code === "23505") {
    return res.status(400).json({ message: "Cadastro j\xE1 existente para o dado informado" });
  }
  if (error instanceof import_zod4.ZodError) {
    return errorsValidationZod(error.issues, res);
  }
  if (error instanceof import_library.PrismaClientInitializationError) {
    return res.status(500).json({
      title: "PrismaClientInitializationError",
      errorCode: error.errorCode,
      message: "Erro na base de dados"
    });
  }
  if (error instanceof import_library.PrismaClientKnownRequestError) {
    if (error.code === "1001") {
      return res.status(500).json({
        title: "Erro na base de dados",
        errorCode: error.code,
        message: error.message
      });
    } else {
      return res.status(401).json({
        title: "PrismaClientKnownRequestError",
        errorCode: error.code,
        message: error.message
      });
    }
  }
  if (error instanceof import_axios2.AxiosError) {
    if (error.code === "ECONNREFUSED") {
      return res.status(500).json({ message: "Conex\xE3o com banco de dados falhou" });
    }
    if (error.code === "ERR_BAD_REQUEST") {
      return res.status(400).json({ message: "Credenciais inv\xE1lidas" });
    }
    if (error.code === "401") {
      return new UnauthorizedError("Acesso negado");
    }
    if (error.code === "403") {
      return new UnauthorizedError("Usu\xE1rio n\xE3o autenticado");
    }
  }
  console.log("STACK TRACE", error);
  return res.status(statusCode).json({ message });
};

// src/visit/visit.routes.ts
var import_express4 = require("express");

// src/auth/middlewares/auth.middleware.ts
var import_jsonwebtoken = require("jsonwebtoken");
var SECRET_KEY = process.env.PUBLIC_KEY || "";
function AuthMiddleware(userRoles) {
  return (req, res, next) => {
    const access_token = req.headers["x-access-token"];
    if (!access_token) {
      return res.status(401).json({ message: "Usu\xE1rio n\xE3o logado. Acesso n\xE3o autorizado" });
    }
    const token = access_token.substring(7).trim();
    (0, import_jsonwebtoken.verify)(token, SECRET_KEY, (error, payload) => {
      if (error instanceof import_jsonwebtoken.TokenExpiredError) {
        return res.status(403).json({ message: "Token expirado. Acesso negado" });
      }
      if (error instanceof import_jsonwebtoken.JsonWebTokenError) {
        return res.status(403).json({ message: "Token inv\xE1lido. Acesso negado" });
      }
      const result = {
        username: payload.preferred_username,
        email: payload.email,
        resource_access: payload.resource_access
      };
      const rolesExistis = result.resource_access.pgm_manager.roles.some(
        (role) => userRoles.includes(role)
      );
      if (!rolesExistis) {
        res.status(403).json({
          message: "Usu\xE1rio n\xE3o tem permiss\xE3o para acessar esse recurso"
        });
      }
      next();
    });
  };
}

// src/visit/visit.controller.ts
var visit_controller_exports = {};
__export(visit_controller_exports, {
  createVisit: () => createVisit,
  createVisitToVisitor: () => createVisitToVisitor,
  findAll: () => findAll,
  findBadgesBySecretary: () => findBadgesBySecretary,
  findByStatusBadgeSecretary: () => findByStatusBadgeSecretary,
  findOne: () => findOne,
  findVisitByStatusAndVisitorId: () => findVisitByStatusAndVisitorId,
  updateStatus: () => updateStatus
});

// src/visit/visit.schema.ts
var import_zod5 = require("zod");
var createVisitSchema = import_zod5.z.object({
  badge: import_zod5.z.string({ required_error: "Crach\xE1 \xE9 obrigat\xF3rio" }).min(1, "Crach\xE1 \xE9 obrigat\xF3rio").min(2, "Crach\xE1 deve ser informado com dois d\xEDgitos. Ex: 01, 02...").max(2, "Crach\xE1 deve ter no m\xE1ximo dois d\xEDgitos"),
  secretary: import_zod5.z.string({ required_error: "Secretaria \xE9 obrigat\xF3rio" }).min(1, "Secretaria \xE9 obrigat\xF3rio"),
  status: import_zod5.z.boolean().optional(),
  visitor_id: import_zod5.z.string({ required_error: "ID do visitante \xE9 obrigat\xF3rio" }).min(1, "ID do visitante \xE9 obrigat\xF3rio").uuid({ message: "ID informado \xE9 inv\xE1lido" })
});
var createVisitToVisitorSchema = import_zod5.z.object({
  badge: import_zod5.z.string({ required_error: "Crach\xE1 \xE9 obrigat\xF3rio" }).min(1, "Crach\xE1 \xE9 obrigat\xF3rio").min(2, "Crach\xE1 deve ser informado com dois d\xEDgitos. Ex: 01, 02...").max(2, "Crach\xE1 deve ter no m\xE1ximo dois d\xEDgitos"),
  secretary: import_zod5.z.string({ required_error: "Secretaria \xE9 obrigat\xF3rio" }).min(1, "Secretaria \xE9 obrigat\xF3rio"),
  status: import_zod5.z.boolean().optional()
});
var validationParamsVisitorSchema = import_zod5.z.object({
  id: import_zod5.z.string({ required_error: "ID do visitante \xE9 obrigat\xF3rio" }).uuid({
    message: "ID informado \xE9 invalido"
  })
});

// src/visit/visit.controller.ts
var createVisit = async (req, res) => {
  createVisitSchema.parse(req.body);
  const { ...visitDto } = req.body;
  const visit = await visit_service_exports.createVisit({
    ...visitDto
  });
  return res.status(201).json(visit);
};
var createVisitToVisitor = async (req, res) => {
  validationParamsVisitorSchema.parse(req.params);
  const { id } = req.params;
  createVisitToVisitorSchema.parse(req.body);
  const { ...visitDto } = req.body;
  Reflect.deleteProperty(visitDto, "visitor_id");
  const newVisit = await visit_service_exports.createVisitToVisitor(visitDto, id);
  res.status(201).json(newVisit);
};
var updateStatus = async (req, res) => {
  validationParamsVisitorSchema.parse(req.params);
  const { id } = req.params;
  const visitFound = await visit_service_exports.getOneVisit(id);
  if (!visitFound) {
    throw new NotFoundError(`Atendimento n\xE3o encontrado para o ID: ${id}`);
  }
  const visitUpdated = await visit_service_exports.updateStatus(id);
  return res.status(200).json(visitUpdated);
};
var findAll = async (req, res) => {
  const search = String(req.query.search || "");
  const status = Boolean(req.query.status || false);
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 10;
  const skip = (page - 1) * limit;
  const [visits, totalItems] = await prismaClient.$transaction([
    visit_service_exports.getAllVisits(search, status, skip, limit),
    prismaClient.visit.count()
  ]);
  const visitsResponse = {
    content: visits,
    currentPage: page,
    itemsPerPage: limit,
    totalItems
  };
  return res.status(200).json(visitsResponse);
};
var findOne = async (req, res) => {
  const { id } = req.params;
  const visitFound = await visit_service_exports.getOneVisit(id);
  if (!visitFound) {
    throw new NotFoundError(`Atendimento n\xE3o encontrado para o ID: ${id}`);
  }
  return res.status(200).json(visitFound);
};
var findByStatusBadgeSecretary = async (req, res) => {
  const { badge, secretary } = req.query;
  const visitFound = await visit_service_exports.getByStatusBadgeSecretary(
    badge,
    secretary
  );
  if (!visitFound) {
    return res.status(200).json({ statusVisit: false, visitId: "", badgeVisit: "" });
  }
  return res.status(200).json({
    statusVisit: true,
    visitId: visitFound.id,
    badgeVisit: visitFound.badge
  });
};
var findVisitByStatusAndVisitorId = async (req, res) => {
  const visitorId = req.params.id;
  const visitFound = await visit_service_exports.getByStatusAndVisitorId(visitorId);
  if (!visitFound) {
    return res.status(200).json({
      status: false,
      visitorName: "",
      secretaryName: "",
      badgeNumber: ""
    });
  }
  const { visitor, secretary, badge } = visitFound;
  return res.status(200).json({
    status: true,
    visitorName: visitor?.name,
    secretaryName: secretary,
    badgeNumber: badge
  });
};
var findBadgesBySecretary = async (req, res) => {
  const { secretary } = req.query;
  const badgesFound = await visit_service_exports.getBadgesBySecretary(
    secretary
  );
  if (!badgesFound) {
    res.status(200).json({ badgesFound: [] });
  }
  const results = [];
  badgesFound.forEach((value) => results.push(value.badge));
  return res.status(200).json(results);
};

// src/visit/visit.service.ts
var visit_service_exports = {};
__export(visit_service_exports, {
  createVisit: () => createVisit2,
  createVisitToVisitor: () => createVisitToVisitor2,
  getAllVisits: () => getAllVisits,
  getBadgesBySecretary: () => getBadgesBySecretary,
  getByStatusAndVisitorId: () => getByStatusAndVisitorId,
  getByStatusBadgeSecretary: () => getByStatusBadgeSecretary,
  getOneVisit: () => getOneVisit,
  updateStatus: () => updateStatus2
});
var createVisit2 = (visitDto) => {
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
          document: true
        }
      }
    }
  });
};
var createVisitToVisitor2 = (visitDto, visitorId) => {
  return prismaClient.visit.create({
    data: {
      ...visitDto,
      visitor_id: visitorId
    },
    select: {
      id: true,
      badge: true,
      secretary: true,
      visitor: {
        select: {
          id: true,
          name: true,
          document: true
        }
      }
    }
  });
};
var updateStatus2 = async (visitId) => {
  return prismaClient.visit.update({
    where: { id: visitId },
    data: { status: true }
  });
};
var getAllVisits = (search, status, skip, limit) => {
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
          document: true
        }
      }
    },
    where: {
      status,
      AND: {
        visitor: {
          OR: [
            {
              name: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              document: {
                contains: search,
                mode: "insensitive"
              }
            }
          ]
        }
      }
    },
    orderBy: {
      created_at: "desc"
    },
    skip,
    take: limit
  });
};
var getOneVisit = (id) => {
  return prismaClient.visit.findUnique({
    where: { id }
  });
};
var getByStatusBadgeSecretary = (badge, secretary) => {
  return prismaClient.visit.findFirst({
    where: {
      status: false,
      badge,
      secretary
    },
    select: {
      id: true,
      badge: true
    }
  });
};
async function getByStatusAndVisitorId(visitorId) {
  return prismaClient.visit.findFirst({
    where: {
      status: false,
      visitor: {
        id: visitorId
      }
    },
    select: {
      secretary: true,
      badge: true,
      visitor: {
        select: {
          name: true
        }
      }
    }
  });
}
var getBadgesBySecretary = (secretary) => prismaClient.visit.findMany({
  where: {
    status: false,
    secretary
  },
  select: {
    badge: true
  }
});

// src/visit/visit.routes.ts
var visitRoutes = (0, import_express4.Router)();
visitRoutes.post(
  "/visits",
  AuthMiddleware(["USER", "ADMIN"]),
  resolver(visit_controller_exports.createVisit)
).post(
  "/visits/:id",
  AuthMiddleware(["USER", "ADMIN"]),
  resolver(visit_controller_exports.createVisitToVisitor)
).patch(
  "/visits/:id",
  AuthMiddleware(["USER", "ADMIN"]),
  resolver(visit_controller_exports.updateStatus)
).get(
  "/visits",
  AuthMiddleware(["USER", "ADMIN", "GUEST"]),
  resolver(visit_controller_exports.findAll)
).get(
  "/visits/badge_exists",
  resolver(visit_controller_exports.findByStatusBadgeSecretary)
).get("/visits/all_badges", resolver(visit_controller_exports.findBadgesBySecretary)).get(
  "/visits/by_visitor/:id",
  AuthMiddleware(["USER", "ADMIN", "GUEST"]),
  resolver(visit_controller_exports.findVisitByStatusAndVisitorId)
).get(
  "/visits/:id",
  AuthMiddleware(["USER", "ADMIN", "GUEST"]),
  resolver(visit_controller_exports.findOne)
);
var visit_routes_default = visitRoutes;

// src/visitor/visitor.routes.ts
var import_express5 = require("express");

// src/visitor/visitor.controller.ts
var visitor_controller_exports = {};
__export(visitor_controller_exports, {
  findByCPF: () => findByCPF,
  findOne: () => findOne2,
  listAll: () => listAll,
  saveVisitor: () => saveVisitor
});
var saveVisitor = async (req, res) => {
  const { visit } = req.body;
  if (visit) {
    createVisitorWithVisitSchema.parse(req.body);
  } else {
    createVisitorSchema.parse(req.body);
  }
  const visitor = await visitor_service_exports.createVisitor(req.body);
  return res.status(201).json(visitor);
};
var listAll = async (req, res) => {
  const search = String(req.query.search || "");
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 10;
  const skip = (page - 1) * limit;
  const [visitors, totalItems] = await prismaClient.$transaction([
    visitor_service_exports.getAllVisitors(search, skip, limit),
    prismaClient.visitor.count()
  ]);
  const visitorResponse = {
    content: visitors,
    currentPage: page,
    itemsPerPage: limit,
    totalItems
  };
  return res.status(200).json(visitorResponse);
};
var findOne2 = async (req, res) => {
  const { id } = req.params;
  const visitorFound = await visitor_service_exports.getOneVisitor(id);
  if (!visitorFound) {
    throw new NotFoundError(`Visitante n\xE3o encontrado para o ID: ${id}`);
  }
  return res.status(200).json(visitorFound);
};
var findByCPF = async (req, res) => {
  const cpfParam = String(req.query.cpf || "");
  validationCPFNumber.parse(+cpfParam);
  validationCPFString.parse(cpfParam);
  const visitorFound = await visitor_service_exports.findByCPF(
    cpfParam
  );
  return res.status(200).json(visitorFound);
};

// src/visitor/visitor.service.ts
var visitor_service_exports = {};
__export(visitor_service_exports, {
  createVisitor: () => createVisitor,
  findByCPF: () => findByCPF2,
  getAllVisitors: () => getAllVisitors,
  getOneVisitor: () => getOneVisitor
});
var createVisitor = ({ visit, ...visitorDto }) => {
  return prismaClient.visitor.create({
    data: {
      ...visitorDto,
      visits: {
        create: visit
      }
    },
    select: {
      id: true,
      name: true,
      visits: {
        select: {
          id: true,
          badge: true,
          secretary: true,
          status: true
        }
      }
    }
  });
};
var getAllVisitors = (search, skip, limit) => {
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
          status: true
        }
      }
    },
    where: {
      OR: [
        {
          name: {
            contains: search,
            mode: "insensitive"
          }
        },
        {
          document: {
            contains: search,
            mode: "insensitive"
          }
        }
      ]
    },
    orderBy: {
      name: "asc"
    },
    skip,
    take: limit
  });
};
var getOneVisitor = (id) => {
  return prismaClient.visitor.findUnique({
    where: { id }
  });
};
var findByCPF2 = (document) => {
  return prismaClient.visitor.findFirst({
    where: { document },
    select: { document: true }
  });
};

// src/visitor/visitor.schema.ts
var import_zod6 = require("zod");
var createVisitorSchema = import_zod6.z.object({
  name: import_zod6.z.string({ required_error: "Nome do visitante \xE9 obrigat\xF3rio" }).min(1, "Nome do visitante \xE9 obrigat\xF3rio").min(6, "Nome deve conter no m\xEDnimo 6 caracteres"),
  document: import_zod6.z.string({ required_error: "CPF do visitante \xE9 obrigat\xF3rio" }).min(1, "CPF do visitante \xE9 obrigat\xF3rio").min(11, "Informe somente os n\xFAmeros do CPF (Ex: 24556790109)").max(11, "Informe somente os n\xFAmeros do CPF (Ex: 24556790109)")
});
var createVisitorWithVisitSchema = import_zod6.z.object({
  name: import_zod6.z.string({ required_error: "Nome do visitante \xE9 obrigat\xF3rio" }).min(1, "Nome do visitante \xE9 obrigat\xF3rio").min(6, "Nome deve conter no m\xEDnimo 6 caracteres"),
  document: import_zod6.z.string({ required_error: "CPF do visitante \xE9 obrigat\xF3rio" }).min(1, "CPF do visitante \xE9 obrigat\xF3rio").min(11, "Informe somente os n\xFAmeros do CPF (Ex: 24556790109)").max(11, "Informe somente os n\xFAmeros do CPF (Ex: 24556790109)"),
  visit: import_zod6.z.object({
    badge: import_zod6.z.string({ required_error: "Crach\xE1 \xE9 obrigat\xF3rio" }).min(1, "Crach\xE1 \xE9 obrigat\xF3rio").min(2, "Crach\xE1 deve ser informado com dois d\xEDgitos. Ex: 01, 02...").max(2, "Crach\xE1 deve ter no m\xE1ximo dois d\xEDgitos"),
    secretary: import_zod6.z.string({ required_error: "Secretaria \xE9 obrigat\xF3rio" }).min(1, "Secretaria \xE9 obrigat\xF3rio"),
    status: import_zod6.z.boolean().optional()
  })
});
var validationCPFNumber = import_zod6.z.number({
  required_error: "CPF do visitante \xE9 obrigat\xF3rio",
  invalid_type_error: "CPF deve conter caracteres exclusivamente num\xE9ricos"
});
var validationCPFString = import_zod6.z.string().min(1, "CPF do visitante \xE9 obrigat\xF3rio").min(11, "CPF deve ter 11 caracteres exclusivamente num\xE9ricos").max(11, "CPF deve ter 11 caracteres exclusivamente num\xE9ricos");

// src/visitor/visitor.routes.ts
var visitorRoutes = (0, import_express5.Router)();
visitorRoutes.post(
  "/visitors",
  AuthMiddleware(["USER", "ADMIN"]),
  resolver(visitor_controller_exports.saveVisitor)
).get(
  "/visitors",
  AuthMiddleware(["USER", "ADMIN", "GUEST"]),
  resolver(visitor_controller_exports.listAll)
).get(
  "/visitors/document",
  AuthMiddleware(["USER", "ADMIN", "GUEST"]),
  resolver(visitor_controller_exports.findByCPF)
).get(
  "/visitors/:id",
  AuthMiddleware(["USER", "ADMIN", "GUEST"]),
  resolver(visitor_controller_exports.findOne)
);
var visitor_routes_default = visitorRoutes;

// src/app.ts
var app = (0, import_express6.default)();
app.use(import_express6.default.json());
app.use(import_express6.default.urlencoded({ extended: true }));
app.use((0, import_morgan.default)("dev"));
app.use((0, import_cors.default)());
app.use("/api", [
  visitor_routes_default,
  visit_routes_default,
  sign_up_routes_default,
  sign_in_routes_default,
  role_routes_default
]);
app.use(errorsGlobalMiddleware);
var app_default = app;

// src/server.ts
var main = async () => {
  try {
    app_default.listen(3e3, () => console.log("Server running in the port", 3e3));
  } catch (err) {
    console.error("Erro connected database or running server");
    console.error(err);
  }
};
main().then();
