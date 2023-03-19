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

// src/auth/middlewares/auth.middleware.ts
var auth_middleware_exports = {};
__export(auth_middleware_exports, {
  AuthMiddleware: () => AuthMiddleware
});
module.exports = __toCommonJS(auth_middleware_exports);
var import_jsonwebtoken = require("jsonwebtoken");
var SECRET_KEY = process.env.PUBLIC_KEY || "";
function AuthMiddleware(userRoles) {
  return (req, res, next) => {
    const access_token = req.headers["x-access-token"];
    if (!access_token) {
      return res.status(401).json({ message: "Usu\xE1rio n\xE3o logado. Acesso n\xE3o autorizado" });
    }
    const token = access_token.substring(7).trim();
    (0, import_jsonwebtoken.verify)(token, SECRET_KEY, (error, payload) => {
      if (error instanceof import_jsonwebtoken.TokenExpiredError) {
        return res.status(403).json({ message: "Token expirado. Acesso negado" });
      }
      if (error instanceof import_jsonwebtoken.JsonWebTokenError) {
        return res.status(403).json({ message: "Token inv\xE1lido. Acesso negado" });
      }
      const result = {
        username: payload.preferred_username,
        email: payload.email,
        resource_access: payload.resource_access
      };
      const rolesExistis = result.resource_access.pgm_manager.roles.some(
        (role) => userRoles.includes(role)
      );
      if (!rolesExistis) {
        res.status(403).json({
          message: "Usu\xE1rio n\xE3o tem permiss\xE3o para acessar esse recurso"
        });
      }
      next();
    });
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AuthMiddleware
});
