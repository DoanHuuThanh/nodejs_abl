"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const knex_1 = __importDefault(require("../db/knex"));
async function authMiddleware(req, res, next) {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Không có token, xác thực bị từ chối' });
    }
    try {
        const secretKey = process.env.JWT_SECRET;
        const decoded = jsonwebtoken_1.default.verify(token, secretKey);
        console.log(token);
        const adminId = decoded.admin.id;
        const dbAdmin = await (0, knex_1.default)('admins').where({ id: adminId }).first();
        if (!dbAdmin) {
            return res.status(404).json({ message: 'Người dùng không tồn tại' });
        }
        req.admin = dbAdmin;
        next();
    }
    catch (error) {
        console.error('Lỗi xác thực token:', error);
        res.status(401).json({ message: 'Token không hợp lệ' });
    }
}
//# sourceMappingURL=authAdminMiddleware.js.map