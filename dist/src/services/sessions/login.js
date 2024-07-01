"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const knex_1 = __importDefault(require("../../db/knex"));
const login = async (user) => {
    const { id_login, password } = user;
    try {
        const dbUser = await (0, knex_1.default)('users')
            .where({ id_login })
            .first();
        if (!dbUser) {
            console.error('Tài khoản không tồn tại');
            return null; // Có thể trả về null hoặc throw error
        }
        const isMatch = await bcryptjs_1.default.compare(password, dbUser.password);
        if (!isMatch) {
            console.error('Mật khẩu không đúng');
            return null; // Có thể trả về null hoặc throw error
        }
        const payload = {
            user: {
                id: dbUser.id,
            },
        };
        const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET || 'your_jwt_secret', {
            expiresIn: '1h',
        });
        const { password: _, ...userWithoutPassword } = dbUser;
        return { user: userWithoutPassword, token };
    }
    catch (error) {
        console.error('Lỗi đăng nhập:', error);
        throw new Error('Lỗi đăng nhập');
    }
};
exports.login = login;
//# sourceMappingURL=login.js.map