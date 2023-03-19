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

// src/visit/visit.service.ts
var visit_service_exports = {};
__export(visit_service_exports, {
  createVisit: () => createVisit,
  createVisitToVisitor: () => createVisitToVisitor,
  getAllVisits: () => getAllVisits,
  getBadgesBySecretary: () => getBadgesBySecretary,
  getByStatusAndVisitorId: () => getByStatusAndVisitorId,
  getByStatusBadgeSecretary: () => getByStatusBadgeSecretary,
  getOneVisit: () => getOneVisit,
  updateStatus: () => updateStatus
});
module.exports = __toCommonJS(visit_service_exports);

// prisma/config/prisma.client.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();

// src/visit/visit.service.ts
var createVisit = (visitDto) => {
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
var createVisitToVisitor = (visitDto, visitorId) => {
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
var updateStatus = async (visitId) => {
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createVisit,
  createVisitToVisitor,
  getAllVisits,
  getBadgesBySecretary,
  getByStatusAndVisitorId,
  getByStatusBadgeSecretary,
  getOneVisit,
  updateStatus
});
