"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const knex_1 = __importDefault(require("../db/knex"));
async function authMiddleware(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({ message: 'Không có token, xác thực bị từ chối' });
    }
    try {
        const secretKey = process.env.JWT_SECRET;
        const decoded = jsonwebtoken_1.default.verify(token, secretKey);
        const userId = decoded.user.id;
        const dbUser = await (0, knex_1.default)('users').where({ id: userId }).first();
        if (!dbUser) {
            return res.status(404).json({ message: 'Người dùng không tồn tại' });
        }
        req.admin = dbUser; // Attach user object to request
        next();
    }
    catch (error) {
        console.error('Lỗi xác thực token:', error);
        res.status(401).json({ message: 'Token không hợp lệ' });
    }
}
exports.default = authMiddleware;
//# sourceMappingURL=authAdminMiddleware.js.map