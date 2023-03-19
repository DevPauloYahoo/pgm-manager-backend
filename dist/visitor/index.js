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

// src/visitor/index.ts
var visitor_exports = {};
__export(visitor_exports, {
  createVisitorSchema: () => createVisitorSchema,
  createVisitorWithVisitSchema: () => createVisitorWithVisitSchema,
  validationCPFNumber: () => validationCPFNumber,
  validationCPFString: () => validationCPFString,
  visitorController: () => visitor_controller_exports,
  visitorService: () => visitor_service_exports
});
module.exports = __toCommonJS(visitor_exports);

// src/visitor/visitor.controller.ts
var visitor_controller_exports = {};
__export(visitor_controller_exports, {
  findByCPF: () => findByCPF,
  findOne: () => findOne,
  listAll: () => listAll,
  saveVisitor: () => saveVisitor
});

// prisma/config/prisma.client.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();

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

// src/visitor/visitor.controller.ts
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
var findOne = async (req, res) => {
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

// src/visitor/visitor.routes.ts
var import_express = require("express");

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

// src/visitor/visitor.routes.ts
var visitorRoutes = (0, import_express.Router)();
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

// src/visitor/visitor.schema.ts
var import_zod = require("zod");
var createVisitorSchema = import_zod.z.object({
  name: import_zod.z.string({ required_error: "Nome do visitante \xE9 obrigat\xF3rio" }).min(1, "Nome do visitante \xE9 obrigat\xF3rio").min(6, "Nome deve conter no m\xEDnimo 6 caracteres"),
  document: import_zod.z.string({ required_error: "CPF do visitante \xE9 obrigat\xF3rio" }).min(1, "CPF do visitante \xE9 obrigat\xF3rio").min(11, "Informe somente os n\xFAmeros do CPF (Ex: 24556790109)").max(11, "Informe somente os n\xFAmeros do CPF (Ex: 24556790109)")
});
var createVisitorWithVisitSchema = import_zod.z.object({
  name: import_zod.z.string({ required_error: "Nome do visitante \xE9 obrigat\xF3rio" }).min(1, "Nome do visitante \xE9 obrigat\xF3rio").min(6, "Nome deve conter no m\xEDnimo 6 caracteres"),
  document: import_zod.z.string({ required_error: "CPF do visitante \xE9 obrigat\xF3rio" }).min(1, "CPF do visitante \xE9 obrigat\xF3rio").min(11, "Informe somente os n\xFAmeros do CPF (Ex: 24556790109)").max(11, "Informe somente os n\xFAmeros do CPF (Ex: 24556790109)"),
  visit: import_zod.z.object({
    badge: import_zod.z.string({ required_error: "Crach\xE1 \xE9 obrigat\xF3rio" }).min(1, "Crach\xE1 \xE9 obrigat\xF3rio").min(2, "Crach\xE1 deve ser informado com dois d\xEDgitos. Ex: 01, 02...").max(2, "Crach\xE1 deve ter no m\xE1ximo dois d\xEDgitos"),
    secretary: import_zod.z.string({ required_error: "Secretaria \xE9 obrigat\xF3rio" }).min(1, "Secretaria \xE9 obrigat\xF3rio"),
    status: import_zod.z.boolean().optional()
  })
});
var validationCPFNumber = import_zod.z.number({
  required_error: "CPF do visitante \xE9 obrigat\xF3rio",
  invalid_type_error: "CPF deve conter caracteres exclusivamente num\xE9ricos"
});
var validationCPFString = import_zod.z.string().min(1, "CPF do visitante \xE9 obrigat\xF3rio").min(11, "CPF deve ter 11 caracteres exclusivamente num\xE9ricos").max(11, "CPF deve ter 11 caracteres exclusivamente num\xE9ricos");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createVisitorSchema,
  createVisitorWithVisitSchema,
  validationCPFNumber,
  validationCPFString,
  visitorController,
  visitorService
});
