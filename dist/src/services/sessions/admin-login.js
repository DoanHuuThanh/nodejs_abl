"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminLogin = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const knex_1 = __importDefault(require("../../db/knex"));
const adminLogin = async (admin) => {
    const { id_login, password } = admin;
    console.log(id_login);
    try {
        console.log(id_login);
        const dbAdmin = await (0, knex_1.default)('admins')
            .where({ id_login })
            .first();
        if (!dbAdmin) {
            console.error('Tài khoản không tồn tại');
            return null;
        }
        const isMatch = await bcryptjs_1.default.compare(password, dbAdmin.password);
        if (!isMatch) {
            console.error('Mật khẩu không đúng');
            return null;
        }
        const payload = {
            admin: {
                id: dbAdmin.id,
            },
        };
        const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET || 'your_jwt_secret', {
            expiresIn: '1h',
        });
        const { password: _, ...admin } = dbAdmin;
        return { admin: admin, token };
    }
    catch (error) {
        console.error('Lỗi đăng nhập:', error);
        throw new Error('Lỗi đăng nhập');
    }
};
exports.adminLogin = adminLogin;
//# sourceMappingURL=admin-login.js.map