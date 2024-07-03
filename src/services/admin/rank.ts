import db from '../../db/knex';
import { Admin, Rank } from '../../config/interface';

const createRank = async (rank: Rank, admin: Admin): Promise<Rank | null> => {
    const { name } = rank;
    try {
        const [newRank] = await db<Rank>('ranks')
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
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error creating Rank:', error);
        return null;
    }
};

const getRank = async (admin: Admin): Promise<Rank[] | null> => {
    try {
        const ranks: Rank[] = await db<Rank>('ranks')
        .where({ admin_id: admin.id })
        .select('*') as Rank[];

        return ranks;
    } catch (error) {
        console.error('Error creating Rank:', error);
        return null;
    }
};

const deleteRank = async (id: number,admin: Admin): Promise<boolean | null> => {
    try {
        const deletedCount: number = await db<Rank>('ranks')
            .where({ id, admin_id: admin.id })
            .delete();

        if (deletedCount > 0) {
            return true; 
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error deleting Rank:', error);
        return null;
    }
}

export { createRank, getRank, deleteRank };
