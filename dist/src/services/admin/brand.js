"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBrand = exports.getBrand = exports.createBrand = void 0;
const knex_1 = __importDefault(require("../../db/knex"));
const createBrand = async (brand, admin) => {
    const { name } = brand;
    try {
        const [newBrand] = await (0, knex_1.default)('brands')
            .insert({
            name,
            admin_id: admin.id
        })
            .returning('*');
        if (newBrand) {
            return {
                id: newBrand.id,
                name: newBrand.name,
                admin_id: newBrand.admin_id,
                created_at: newBrand.created_at,
                updated_at: newBrand.updated_at
            };
        }
        else {
            return null;
        }
    }
    catch (error) {
        console.error('Error creating brand:', error);
        return null;
    }
};
exports.createBrand = createBrand;
const getBrand = async (admin) => {
    try {
        const brands = await (0, knex_1.default)('brands')
            .where({ admin_id: admin.id })
            .select('*');
        return brands;
    }
    catch (error) {
        console.error('Error creating brand:', error);
        return null;
    }
};
exports.getBrand = getBrand;
const deleteBrand = async (id, admin) => {
    try {
        const deletedCount = await (0, knex_1.default)('brands')
            .where({ id, admin_id: admin.id })
            .delete();
        if (deletedCount > 0) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (error) {
        console.error('Error deleting brand:', error);
        return null;
    }
};
exports.deleteBrand = deleteBrand;
//# sourceMappingURL=brand.js.map