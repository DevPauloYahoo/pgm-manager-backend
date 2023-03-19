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

// src/visitor/visitor.service.ts
var visitor_service_exports = {};
__export(visitor_service_exports, {
  createVisitor: () => createVisitor,
  findByCPF: () => findByCPF,
  getAllVisitors: () => getAllVisitors,
  getOneVisitor: () => getOneVisitor
});
module.exports = __toCommonJS(visitor_service_exports);

// prisma/config/prisma.client.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();

// src/visitor/visitor.service.ts
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
var findByCPF = (document) => {
  return prismaClient.visitor.findFirst({
    where: { document },
    select: { document: true }
  });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createVisitor,
  findByCPF,
  getAllVisitors,
  getOneVisitor
});
