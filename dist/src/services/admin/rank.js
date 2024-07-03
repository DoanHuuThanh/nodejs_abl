"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRank = exports.getRank = exports.createRank = void 0;
const knex_1 = __importDefault(require("../../db/knex"));
const createRank = async (rank, admin) => {
    const { name } = rank;
    try {
        const [newRank] = await (0, knex_1.default)('ranks')
            .insert({
            name,
            admin_id: admin.id
        })
            .returning('*');
        if (newRank) {
            return {
                id: newRank.id,
                name: newRank.name,
                admin_id: newRank.admin_id,
                created_at: newRank.created_at,
                updated_at: newRank.updated_at
            };
        }
        else {
            return null;
        }
    }
    catch (error) {
        console.error('Error creating Rank:', error);
        return null;
    }
};
exports.createRank = createRank;
const getRank = async (admin) => {
    try {
        const ranks = await (0, knex_1.default)('ranks')
            .where({ admin_id: admin.id })
            .select('*');
        return ranks;
    }
    catch (error) {
        console.error('Error creating Rank:', error);
        return null;
    }
};
exports.getRank = getRank;
const deleteRank = async (id, admin) => {
    try {
        const deletedCount = await (0, knex_1.default)('ranks')
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
        console.error('Error deleting Rank:', error);
        return null;
    }
};
exports.deleteRank = deleteRank;
//# sourceMappingURL=rank.js.map