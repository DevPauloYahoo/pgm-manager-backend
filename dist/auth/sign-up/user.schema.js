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

// src/auth/sign-up/user.schema.ts
var user_schema_exports = {};
__export(user_schema_exports, {
  userCreateSchema: () => userCreateSchema,
  userSchema: () => userSchema
});
module.exports = __toCommonJS(user_schema_exports);
var import_zod2 = require("zod");

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

// src/auth/sign-up/user.schema.ts
var userCreateSchema = import_zod2.z.object({
  name: import_zod2.z.string({ required_error: "Nome \xE9 obrigat\xF3rio" }).min(1, "Nome \xE9 obrigat\xF3rio").min(6, "Nome deve ter no m\xEDnimo 6 caracteres"),
  email: import_zod2.z.string({ required_error: "Email \xE9 obrigat\xF3rio" }).min(1, "Email \xE9 obrigat\xF3rio").email("Email inv\xE1lido"),
  password: import_zod2.z.string({ required_error: "Senha \xE9 obrigat\xF3rio" }).min(1, "Senha \xE9 obrigat\xF3rio").min(6, "deve ter no m\xEDnimo 6 caracteres"),
  roles: import_zod2.z.array(roleSchema).optional()
});
var userSchema = import_zod2.z.object({
  id: import_zod2.z.string().uuid("ID com formato incorreto").optional(),
  name: import_zod2.z.string({ required_error: "Nome \xE9 obrigat\xF3rio" }).min(1, "Nome \xE9 obrigat\xF3rio").min(6, "Nome deve ter no m\xEDnimo 6 caracteres"),
  email: import_zod2.z.string({ required_error: "Email \xE9 obrigat\xF3rio" }).min(1, "Email \xE9 obrigat\xF3rio").email("Email inv\xE1lido"),
  password: import_zod2.z.string({ required_error: "Senha \xE9 obrigat\xF3rio" }).min(1, "Senha \xE9 obrigat\xF3rio").min(6, "deve ter no m\xEDnimo 6 caracteres"),
  roles: import_zod2.z.array(roleSchema).optional()
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  userCreateSchema,
  userSchema
});
