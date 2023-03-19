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

// src/auth/sign-in/sign-in.routes.ts
var sign_in_routes_exports = {};
__export(sign_in_routes_exports, {
  default: () => sign_in_routes_default
});
module.exports = __toCommonJS(sign_in_routes_exports);
var import_express = require("express");

// src/helpers/errors/async-error.resolver.ts
var resolver = (handleFn) => {
  return (req, res, next) => {
    return Promise.resolve(handleFn(req, res, next)).catch((err) => next(err));
  };
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

// src/auth/sign-in/sign-in.routes.ts
var signInRoutes = (0, import_express.Router)();
signInRoutes.post("/users/sign-in", resolver(sign_in_controller_exports.signIn));
var sign_in_routes_default = signInRoutes;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
