"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductTemplate = exports.updateProductTemplate = void 0;
const knex_1 = __importDefault(require("../../db/knex"));
const updateProductTemplate = async (type, value, admin) => {
    try {
        const updateData = {};
        console.log(updateData);
        if (type === 'product_detail_template1') {
            updateData.product_detail_template1 = value;
        }
        else if (type === 'product_detail_template2') {
            updateData.product_detail_template2 = value;
        }
        else if (type === 'product_detail_template3') {
            updateData.product_detail_template3 = value;
        }
        else {
            throw new Error('Invalid template type');
        }
        const [updatedAdmin] = await (0, knex_1.default)('admins')
            .where({ id: admin.id })
            .update(updateData)
            .returning('*');
        if (updatedAdmin) {
            return {
                product_detail_template1: updatedAdmin.product_detail_template1 ?? '',
                product_detail_template2: updatedAdmin.product_detail_template2 ?? '',
                product_detail_template3: updatedAdmin.product_detail_template3 ?? ''
            };
        }
        else {
            return null;
        }
    }
    catch (error) {
        console.error('Error updating product templates:', error);
        return null;
    }
};
exports.updateProductTemplate = updateProductTemplate;
const getProductTemplate = async (admin) => {
    try {
        return {
            product_detail_template1: admin.product_detail_template1 ?? '',
            product_detail_template2: admin.product_detail_template2 ?? '',
            product_detail_template3: admin.product_detail_template3 ?? ''
        };
    }
    catch (error) {
        console.error('Error creating Rank:', error);
        return null;
    }
};
exports.getProductTemplate = getProductTemplate;
//# sourceMappingURL=product_template.js.map