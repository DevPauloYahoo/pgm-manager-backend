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

// src/auth/sign-in/sign-in.controller.ts
var sign_in_controller_exports = {};
__export(sign_in_controller_exports, {
  signIn: () => signIn
});
module.exports = __toCommonJS(sign_in_controller_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  signIn
});
