"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const register_1 = require("../services/sessions/register");
const login_1 = require("../services/sessions/login");
const admin_login_1 = require("../services/sessions/admin-login");
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
const upload = (0, multer_1.default)({ storage: storage });
const uploadFields = upload.fields([
    { name: 'document_front', maxCount: 1 },
    { name: 'document_back', maxCount: 1 },
    { name: 'business_license_front', maxCount: 1 },
    { name: 'business_license_back', maxCount: 1 },
]);
router.post('/register', uploadFields, async (req, res) => {
    const files = req.files;
    const user = req.body;
    const fileUrls = {};
    if (files.business_license_front) {
        fileUrls.business_license_front = `${req.protocol}://${req.get('host')}/public/uploads/${files.business_license_front[0].filename}`;
    }
    if (files.business_license_back) {
        fileUrls.business_license_back = `${req.protocol}://${req.get('host')}/public/uploads/${files.business_license_back[0].filename}`;
    }
    if (files.document_front) {
        fileUrls.document_front = `${req.protocol}://${req.get('host')}/public/uploads/${files.document_front[0].filename}`;
    }
    if (files.document_back) {
        fileUrls.document_back = `${req.protocol}://${req.get('host')}/public/uploads/${files.document_back[0].filename}`;
    }
    try {
        const newUser = await (0, register_1.registerUser)(user, fileUrls);
        res.status(201).json({ user: newUser, status: 200, message: 'Registration successful' });
    }
    catch (error) {
        res.status(500).json({ status: 404, message: 'Registration error' });
    }
});
router.post('/login', async (req, res) => {
    try {
        const authenticate = await (0, login_1.login)(req.body);
        if (authenticate) {
            res.status(201).json({ user: authenticate.user, token: authenticate.token, status: 200, message: 'Login successful' });
        }
        else {
            res.status(500).json({ status: 404, message: 'User not found' });
        }
    }
    catch (error) {
        res.status(500).json({ status: 404, message: 'Login error' });
    }
});
router.post('/admins/sign_in', async (req, res) => {
    try {
        const authenticate = await (0, admin_login_1.adminLogin)(req.body);
        if (authenticate) {
            res.status(201).json({ user: authenticate.admin, token: authenticate.token, status: 200, message: 'Login successful' });
        }
        else {
            res.status(500).json({ status: 404, message: 'User not found' });
        }
    }
    catch (error) {
        res.status(500).json({ status: 404, message: 'Login error' });
    }
});
exports.default = router;
//# sourceMappingURL=sessions.js.map