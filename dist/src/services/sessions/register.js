"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const knex_1 = __importDefault(require("../../db/knex"));
const registerUser = async (userData, file) => {
    console.log(file);
    console.log(userData);
    const { line_id, line_name, birth_day, email, phone_number, address, zip_code, name, delivery_person_name, delivery_zip_code, delivery_address, delivery_phone_number, id_login, password, } = userData;
    const { business_license_front, business_license_back, document_front, document_back, } = file;
    const hashedPassword = await bcryptjs_1.default.hash(password, 10);
    const formattedBirthDay = new Date(birth_day).toISOString(); // đổi định dạng ngày mới thêm vào database được
    const newUser = await (0, knex_1.default)('users').insert({
        line_id,
        line_name,
        birth_day: formattedBirthDay,
        email,
        phone_number,
        address,
        zip_code,
        name,
        delivery_person_name,
        delivery_zip_code,
        delivery_address,
        delivery_phone_number,
        id_login,
        business_license_front,
        business_license_back,
        document_front,
        document_back,
        password: hashedPassword,
    }).returning('*');
    return newUser;
};
exports.registerUser = registerUser;
//# sourceMappingURL=register.js.map