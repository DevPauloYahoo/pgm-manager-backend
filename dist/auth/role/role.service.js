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

// src/auth/role/role.service.ts
var role_service_exports = {};
__export(role_service_exports, {
  createRole: () => createRole,
  getAllRoles: () => getAllRoles,
  getOneRole: () => getOneRole
});
module.exports = __toCommonJS(role_service_exports);

// prisma/config/prisma.client.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();

// src/auth/role/role.service.ts
var createRole = (role) => {
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createRole,
  getAllRoles,
  getOneRole
});
