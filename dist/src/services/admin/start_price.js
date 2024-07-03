"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStartingPrice = exports.getStartingPrice = exports.createStartingPrice = void 0;
const knex_1 = __importDefault(require("../../db/knex"));
const createStartingPrice = async (startingPrice, admin) => {
    const { price } = startingPrice;
    try {
        const [newStartingPrice] = await (0, knex_1.default)('starting_prices')
            .insert({
            price,
            admin_id: admin.id
        })
            .returning('*');
        if (newStartingPrice) {
            return {
                id: newStartingPrice.id,
                price: newStartingPrice.price,
                admin_id: newStartingPrice.admin_id,
                created_at: newStartingPrice.created_at,
                updated_at: newStartingPrice.updated_at
            };
        }
        else {
            return null;
        }
    }
    catch (error) {
        console.error('Error creating StartingPrice:', error);
        return null;
    }
};
exports.createStartingPrice = createStartingPrice;
const getStartingPrice = async (admin) => {
    try {
        const startingPrices = await (0, knex_1.default)('starting_prices')
            .where({ admin_id: admin.id })
            .select('*');
        return startingPrices;
    }
    catch (error) {
        console.error('Error creating StartingPrice:', error);
        return null;
    }
};
exports.getStartingPrice = getStartingPrice;
const deleteStartingPrice = async (id, admin) => {
    try {
        const deletedCount = await (0, knex_1.default)('starting_prices')
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
        console.error('Error deleting StartingPrice:', error);
        return null;
    }
};
exports.deleteStartingPrice = deleteStartingPrice;
//# sourceMappingURL=start_price.js.map