"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = seed;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
async function seed(knex) {
    // Deletes ALL existing entries
    await knex('admins').del();
    // Inserts seed entries
    const hashedPassword = await bcryptjs_1.default.hash('123456', 10);
    await knex('admins').insert([
        {
            id_login: '12345678',
            email: 'admin@example.com',
            password: hashedPassword,
            product_detail_template1: null,
            product_detail_template2: null,
            product_detail_template3: null,
        },
    ]);
}
//# sourceMappingURL=001_admins.js.map