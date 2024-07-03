"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.getCategory = exports.createCategory = void 0;
const knex_1 = __importDefault(require("../../db/knex"));
const createCategory = async (category, admin) => {
    const { name } = category;
    try {
        const [newCategory] = await (0, knex_1.default)('categories')
            .insert({
            name,
            admin_id: admin.id
        })
            .returning('*');
        if (newCategory) {
            return {
                id: newCategory.id,
                name: newCategory.name,
                admin_id: newCategory.admin_id,
                created_at: newCategory.created_at,
                updated_at: newCategory.updated_at
            };
        }
        else {
            return null;
        }
    }
    catch (error) {
        console.error('Error creating Category:', error);
        return null;
    }
};
exports.createCategory = createCategory;
const getCategory = async (admin) => {
    try {
        const categories = await (0, knex_1.default)('categories')
            .where({ admin_id: admin.id })
            .select('*');
        return categories;
    }
    catch (error) {
        console.error('Error creating Category:', error);
        return null;
    }
};
exports.getCategory = getCategory;
const deleteCategory = async (id, admin) => {
    try {
        const deletedCount = await (0, knex_1.default)('categories')
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
        console.error('Error deleting Category:', error);
        return null;
    }
};
exports.deleteCategory = deleteCategory;
//# sourceMappingURL=category.js.map