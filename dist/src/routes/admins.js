"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authAdminMiddleware_1 = require("../middleware/authAdminMiddleware");
const brand_1 = require("../services/admin/brand");
const category_1 = require("../services/admin/category");
const rank_1 = require("../services/admin/rank");
const start_price_1 = require("../services/admin/start_price");
const product_template_1 = require("../services/admin/product_template");
const product_1 = require("../services/admin/product");
const multer_1 = __importDefault(require("multer"));
const router = express_1.default.Router();
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/public/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
        cb(null, true);
    }
    else {
        cb(new Error('Invalid file type'), false);
    }
};
const upload = (0, multer_1.default)({ storage: storage, fileFilter: fileFilter });
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
router.post('/category', authAdminMiddleware_1.authMiddleware, async (req, res) => {
    try {
        if (req.admin) {
            const category = await (0, category_1.createCategory)(req.body, req.admin);
            if (category) {
                res.status(201).json({ category: category, status: 200, message: 'category creation successful' });
            }
            else {
                res.status(500).json({ status: 404, message: 'category not created' });
            }
        }
        else {
            res.status(401).json({ status: 401, message: 'Unauthorized' });
        }
    }
    catch (error) {
        res.status(500).json({ status: 500, message: 'category creation error' });
    }
});
router.get('/category', authAdminMiddleware_1.authMiddleware, async (req, res) => {
    try {
        if (req.admin) {
            const categories = await (0, category_1.getCategory)(req.admin);
            if (categories) {
                res.status(201).json({ items: categories, status: 200 });
            }
            else {
                res.status(500).json({ status: 404, message: 'category not created' });
            }
        }
        else {
            res.status(401).json({ status: 401, message: 'Unauthorized' });
        }
    }
    catch (error) {
        res.status(500).json({ status: 500, message: 'category creation error' });
    }
});
router.delete('/category/:id', authAdminMiddleware_1.authMiddleware, async (req, res) => {
    const id = parseInt(req.params.id);
    console.log(id);
    try {
        if (req.admin) {
            const category = await (0, category_1.deleteCategory)(id, req.admin);
            if (category) {
                res.status(201).json({ status: 200, message: 'category creation successful' });
            }
            else {
                res.status(500).json({ status: 404, message: 'category not created' });
            }
        }
        else {
            res.status(401).json({ status: 401, message: 'Unauthorized' });
        }
    }
    catch (error) {
        res.status(500).json({ status: 500, message: 'category creation error' });
    }
});
//rank
router.post('/rank', authAdminMiddleware_1.authMiddleware, async (req, res) => {
    try {
        if (req.admin) {
            const rank = await (0, rank_1.createRank)(req.body, req.admin);
            if (rank) {
                res.status(201).json({ rank: rank, status: 200, message: 'rank creation successful' });
            }
            else {
                res.status(500).json({ status: 404, message: 'rank not created' });
            }
        }
        else {
            res.status(401).json({ status: 401, message: 'Unauthorized' });
        }
    }
    catch (error) {
        res.status(500).json({ status: 500, message: 'rank creation error' });
    }
});
router.get('/rank', authAdminMiddleware_1.authMiddleware, async (req, res) => {
    try {
        if (req.admin) {
            const ranks = await (0, rank_1.getRank)(req.admin);
            if (ranks) {
                res.status(201).json({ items: ranks, status: 200 });
            }
            else {
                res.status(500).json({ status: 404, message: 'rank not created' });
            }
        }
        else {
            res.status(401).json({ status: 401, message: 'Unauthorized' });
        }
    }
    catch (error) {
        res.status(500).json({ status: 500, message: 'rank creation error' });
    }
});
router.delete('/rank/:id', authAdminMiddleware_1.authMiddleware, async (req, res) => {
    const id = parseInt(req.params.id);
    console.log(id);
    try {
        if (req.admin) {
            const rank = await (0, rank_1.deleteRank)(id, req.admin);
            if (rank) {
                res.status(201).json({ status: 200, message: 'rank creation successful' });
            }
            else {
                res.status(500).json({ status: 404, message: 'rank not created' });
            }
        }
        else {
            res.status(401).json({ status: 401, message: 'Unauthorized' });
        }
    }
    catch (error) {
        res.status(500).json({ status: 500, message: 'rank creation error' });
    }
});
//start_price
router.post('/start_price', authAdminMiddleware_1.authMiddleware, async (req, res) => {
    try {
        if (req.admin) {
            const start_price = await (0, start_price_1.createStartingPrice)(req.body, req.admin);
            if (start_price) {
                res.status(201).json({ start_price: start_price, status: 200, message: 'start_price creation successful' });
            }
            else {
                res.status(500).json({ status: 404, message: 'start_price not created' });
            }
        }
        else {
            res.status(401).json({ status: 401, message: 'Unauthorized' });
        }
    }
    catch (error) {
        res.status(500).json({ status: 500, message: 'start_price creation error' });
    }
});
router.get('/start_price', authAdminMiddleware_1.authMiddleware, async (req, res) => {
    try {
        if (req.admin) {
            const start_prices = await (0, start_price_1.getStartingPrice)(req.admin);
            if (start_prices) {
                res.status(201).json({ items: start_prices, status: 200 });
            }
            else {
                res.status(500).json({ status: 404, message: 'start_price not created' });
            }
        }
        else {
            res.status(401).json({ status: 401, message: 'Unauthorized' });
        }
    }
    catch (error) {
        res.status(500).json({ status: 500, message: 'start_price creation error' });
    }
});
router.delete('/start_price/:id', authAdminMiddleware_1.authMiddleware, async (req, res) => {
    const id = parseInt(req.params.id);
    console.log(id);
    try {
        if (req.admin) {
            const start_price = await (0, start_price_1.deleteStartingPrice)(id, req.admin);
            if (start_price) {
                res.status(201).json({ status: 200, message: 'start_price delete successful' });
            }
            else {
                res.status(500).json({ status: 404, message: 'start_price not deleted' });
            }
        }
        else {
            res.status(401).json({ status: 401, message: 'Unauthorized' });
        }
    }
    catch (error) {
        res.status(500).json({ status: 500, message: 'start_price delete error' });
    }
});
//product_template
router.patch('/product_template', authAdminMiddleware_1.authMiddleware, async (req, res) => {
    try {
        if (req.admin) {
            const type = req.body.type;
            const value = req.body.value;
            const product_template = await (0, product_template_1.updateProductTemplate)(type, value, req.admin);
            if (product_template) {
                res.status(201).json({ product_template1: product_template.product_detail_template1, product_template2: product_template.product_detail_template2, product_template3: product_template.product_detail_template3, status: 200, message: 'product_template creation successful' });
            }
            else {
                res.status(500).json({ status: 404, message: 'product_template not created' });
            }
        }
        else {
            res.status(401).json({ status: 401, message: 'Unauthorized' });
        }
    }
    catch (error) {
        res.status(500).json({ status: 500, message: 'product_template creation error' });
    }
});
router.get('/product_template', authAdminMiddleware_1.authMiddleware, async (req, res) => {
    try {
        if (req.admin) {
            const product_template = await (0, product_template_1.getProductTemplate)(req.admin);
            if (product_template) {
                res.status(201).json({ product_template1: product_template.product_detail_template1, product_template2: product_template.product_detail_template2, product_template3: product_template.product_detail_template3, status: 200 });
            }
            else {
                res.status(500).json({ status: 404, message: 'product_template not created' });
            }
        }
        else {
            res.status(401).json({ status: 401, message: 'Unauthorized' });
        }
    }
    catch (error) {
        res.status(500).json({ status: 500, message: 'product_template creation error' });
    }
});
router.get('/product_template', authAdminMiddleware_1.authMiddleware, async (req, res) => {
    try {
        if (req.admin) {
            const product_template = await (0, product_template_1.getProductTemplate)(req.admin);
            if (product_template) {
                res.status(201).json({ product_template1: product_template.product_detail_template1, product_template2: product_template.product_detail_template2, product_template3: product_template.product_detail_template3, status: 200 });
            }
            else {
                res.status(500).json({ status: 404, message: 'product_template not created' });
            }
        }
        else {
            res.status(401).json({ status: 401, message: 'Unauthorized' });
        }
    }
    catch (error) {
        res.status(500).json({ status: 500, message: 'product_template creation error' });
    }
});
//product 
router.post('/product', authAdminMiddleware_1.authMiddleware, upload.array('file'), async (req, res) => {
    try {
        if (req.admin) {
            const product = await (0, product_1.createProduct)(req);
            if (product) {
                res.status(201).json({ product: product, status: 200, message: "create product successful" });
            }
            else {
                res.status(500).json({ status: 404, message: 'product not created' });
            }
        }
        else {
            res.status(401).json({ status: 401, message: 'Unauthorized' });
        }
    }
    catch (error) {
        res.status(500).json({ status: 500, message: 'product_template creation error' });
    }
});
router.get('/products', authAdminMiddleware_1.authMiddleware, async (req, res) => {
    try {
        if (req.admin) {
            const product = await (0, product_1.getProductsWithDetails)(req.admin.id);
            if (product) {
                res.status(201).json({ product: product, status: 200, message: "create product successful" });
            }
            else {
                res.status(500).json({ status: 404, message: 'product not created' });
            }
        }
        else {
            res.status(401).json({ status: 401, message: 'Unauthorized' });
        }
    }
    catch (error) {
        res.status(500).json({ status: 500, message: 'product_template creation error' });
    }
});
exports.default = router;
//# sourceMappingURL=admins.js.map