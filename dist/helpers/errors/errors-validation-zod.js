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

// src/helpers/errors/errors-validation-zod.ts
var errors_validation_zod_exports = {};
__export(errors_validation_zod_exports, {
  errorsValidationZod: () => errorsValidationZod
});
module.exports = __toCommonJS(errors_validation_zod_exports);

// src/helpers/errors/errors-custom.class.ts
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  errorsValidationZod
});
