"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authAdminMiddleware_1 = require("../middleware/authAdminMiddleware");
const brand_1 = require("../services/admin/brand");
const router = express_1.default.Router();
router.post('/brands', authAdminMiddleware_1.authMiddleware, async (req, res) => {
    try {
        if (req.admin) {
            const brand = await (0, brand_1.createBrand)(req.body, req.admin);
            if (brand) {
                res.status(201).json({ brand: brand, status: 200, message: 'Brand creation successful' });
            }
            else {
                res.status(500).json({ status: 404, message: 'Brand not created' });
            }
        }
        else {
            res.status(401).json({ status: 401, message: 'Unauthorized' });
        }
    }
    catch (error) {
        res.status(500).json({ status: 500, message: 'Brand creation error' });
    }
});
router.get('/brands', authAdminMiddleware_1.authMiddleware, async (req, res) => {
    try {
        if (req.admin) {
            const brand = await (0, brand_1.getBrand)(req.admin);
            if (brand) {
                res.status(201).json({ items: brand, status: 200 });
            }
            else {
                res.status(500).json({ status: 404, message: 'Brand not created' });
            }
        }
        else {
            res.status(401).json({ status: 401, message: 'Unauthorized' });
        }
    }
    catch (error) {
        res.status(500).json({ status: 500, message: 'Brand creation error' });
    }
});
router.delete('/brands/:id', authAdminMiddleware_1.authMiddleware, async (req, res) => {
    const id = parseInt(req.params.id);
    console.log(id);
    try {
        if (req.admin) {
            const brand = await (0, brand_1.deleteBrand)(id, req.admin);
            if (brand) {
                res.status(201).json({ status: 200, message: 'Brand creation successful' });
            }
            else {
                res.status(500).json({ status: 404, message: 'Brand not created' });
            }
        }
        else {
            res.status(401).json({ status: 401, message: 'Unauthorized' });
        }
    }
    catch (error) {
        res.status(500).json({ status: 500, message: 'Brand creation error' });
    }
});
exports.default = router;
//# sourceMappingURL=admins.js.map