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

// src/helpers/index.ts
var helpers_exports = {};
__export(helpers_exports, {
  ApiErrors: () => ApiErrors,
  BadRequestError: () => BadRequestError,
  BadRequestValidationZod: () => BadRequestValidationZod,
  NotFoundError: () => NotFoundError,
  UnauthenticatedError: () => UnauthenticatedError,
  UnauthorizedError: () => UnauthorizedError,
  errorsValidationZod: () => errorsValidationZod,
  resolver: () => resolver
});
module.exports = __toCommonJS(helpers_exports);

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
var BadRequestError = class extends ApiErrors {
  constructor(message) {
    super(message, 400);
  }
};
var BadRequestValidationZod = class {
  constructor(data, res) {
    return res.status(400).json(data);
  }
};
var NotFoundError = class extends ApiErrors {
  constructor(message) {
    super(message, 404);
  }
};
var UnauthenticatedError = class extends ApiErrors {
  constructor(message) {
    super(message, 401);
  }
};
var UnauthorizedError = class extends ApiErrors {
  constructor(message) {
    super(message, 403);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ApiErrors,
  BadRequestError,
  BadRequestValidationZod,
  NotFoundError,
  UnauthenticatedError,
  UnauthorizedError,
  errorsValidationZod,
  resolver
});
