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

// src/visitor/visitor.schema.ts
var visitor_schema_exports = {};
__export(visitor_schema_exports, {
  createVisitorSchema: () => createVisitorSchema,
  createVisitorWithVisitSchema: () => createVisitorWithVisitSchema,
  validationCPFNumber: () => validationCPFNumber,
  validationCPFString: () => validationCPFString
});
module.exports = __toCommonJS(visitor_schema_exports);
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
  validationCPFString
});
