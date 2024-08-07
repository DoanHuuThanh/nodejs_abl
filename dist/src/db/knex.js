"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// db/knex.ts
const knex_1 = __importDefault(require("knex"));
const knexfile_1 = __importDefault(require("../../knexfile"));
const environment = process.env.NODE_ENV || 'development';
const connectionConfig = knexfile_1.default[environment];
const db = (0, knex_1.default)(connectionConfig);
exports.default = db;
//# sourceMappingURL=knex.js.map