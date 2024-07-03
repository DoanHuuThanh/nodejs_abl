import db from '../../db/knex';
import { Admin, StartingPrice } from '../../config/interface';

const createStartingPrice = async (startingPrice: StartingPrice, admin: Admin): Promise<StartingPrice | null> => {
    const { price } = startingPrice;
    try {
        const [newStartingPrice] = await db<StartingPrice>('starting_prices')
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
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error creating StartingPrice:', error);
        return null;
    }
};

const getStartingPrice = async (admin: Admin): Promise<StartingPrice[] | null> => {
    try {
        const startingPrices: StartingPrice[] = await db<StartingPrice>('starting_prices')
        .where({ admin_id: admin.id })
        .select('*') as StartingPrice[];

        return startingPrices;
    } catch (error) {
        console.error('Error creating StartingPrice:', error);
        return null;
    }
};

const deleteStartingPrice = async (id: number,admin: Admin): Promise<boolean | null> => {
    try {
        const deletedCount: number = await db<StartingPrice>('starting_prices')
            .where({ id, admin_id: admin.id })
            .delete();

        if (deletedCount > 0) {
            return true; 
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error deleting StartingPrice:', error);
        return null;
    }
}

export { createStartingPrice, getStartingPrice, deleteStartingPrice };
