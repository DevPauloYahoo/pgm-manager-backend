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

// src/visit/visit.schema.ts
var visit_schema_exports = {};
__export(visit_schema_exports, {
  createVisitSchema: () => createVisitSchema,
  createVisitToVisitorSchema: () => createVisitToVisitorSchema,
  validationParamsVisitorSchema: () => validationParamsVisitorSchema
});
module.exports = __toCommonJS(visit_schema_exports);
var import_zod = require("zod");
var createVisitSchema = import_zod.z.object({
  badge: import_zod.z.string({ required_error: "Crach\xE1 \xE9 obrigat\xF3rio" }).min(1, "Crach\xE1 \xE9 obrigat\xF3rio").min(2, "Crach\xE1 deve ser informado com dois d\xEDgitos. Ex: 01, 02...").max(2, "Crach\xE1 deve ter no m\xE1ximo dois d\xEDgitos"),
  secretary: import_zod.z.string({ required_error: "Secretaria \xE9 obrigat\xF3rio" }).min(1, "Secretaria \xE9 obrigat\xF3rio"),
  status: import_zod.z.boolean().optional(),
  visitor_id: import_zod.z.string({ required_error: "ID do visitante \xE9 obrigat\xF3rio" }).min(1, "ID do visitante \xE9 obrigat\xF3rio").uuid({ message: "ID informado \xE9 inv\xE1lido" })
});
var createVisitToVisitorSchema = import_zod.z.object({
  badge: import_zod.z.string({ required_error: "Crach\xE1 \xE9 obrigat\xF3rio" }).min(1, "Crach\xE1 \xE9 obrigat\xF3rio").min(2, "Crach\xE1 deve ser informado com dois d\xEDgitos. Ex: 01, 02...").max(2, "Crach\xE1 deve ter no m\xE1ximo dois d\xEDgitos"),
  secretary: import_zod.z.string({ required_error: "Secretaria \xE9 obrigat\xF3rio" }).min(1, "Secretaria \xE9 obrigat\xF3rio"),
  status: import_zod.z.boolean().optional()
});
var validationParamsVisitorSchema = import_zod.z.object({
  id: import_zod.z.string({ required_error: "ID do visitante \xE9 obrigat\xF3rio" }).uuid({
    message: "ID informado \xE9 invalido"
  })
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createVisitSchema,
  createVisitToVisitorSchema,
  validationParamsVisitorSchema
});
