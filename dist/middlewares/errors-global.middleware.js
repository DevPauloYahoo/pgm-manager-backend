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

// src/middlewares/errors-global.middleware.ts
var errors_global_middleware_exports = {};
__export(errors_global_middleware_exports, {
  errorsGlobalMiddleware: () => errorsGlobalMiddleware
});
module.exports = __toCommonJS(errors_global_middleware_exports);
var import_library = require("@prisma/client/runtime/library");
var import_axios = require("axios");
var import_zod = require("zod");

// src/helpers/errors/api-errors.class.ts
var ApiErrors = class extends Error {
  constructor(message, statusCode, code) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
  }
};

// src/helpers/errors/errors-custom.class.ts
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

// src/middlewares/errors-global.middleware.ts
var errorsGlobalMiddleware = (error, req, res, next) => {
  const statusCode = error.statusCode ?? 500;
  console.log("STATUS CODE " + statusCode);
  const message = error.statusCode ? error.message : "Erro interno no servidor";
  if (error.code === "23505") {
    return res.status(400).json({ message: "Cadastro j\xE1 existente para o dado informado" });
  }
  if (error instanceof import_zod.ZodError) {
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
  if (error instanceof import_axios.AxiosError) {
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  errorsGlobalMiddleware
});
