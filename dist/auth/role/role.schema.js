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

// src/auth/role/role.schema.ts
var role_schema_exports = {};
__export(role_schema_exports, {
  createRoleSchema: () => createRoleSchema,
  roleSchema: () => roleSchema
});
module.exports = __toCommonJS(role_schema_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createRoleSchema,
  roleSchema
});
