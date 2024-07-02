import db from '../../db/knex';
import { Admin, Brand } from '../../config/interface';

const createBrand = async (brand: Brand, admin: Admin): Promise<Brand | null> => {
    const { name } = brand;
    try {
        const [newBrand] = await db<Brand>('brands')
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
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error creating brand:', error);
        return null;
    }
};

const getBrand = async (admin: Admin): Promise<Brand[] | null> => {
    try {
        const brands: Brand[] = await db<Brand>('brands')
        .where({ admin_id: admin.id })
        .select('*') as Brand[];

        return brands;
    } catch (error) {
        console.error('Error creating brand:', error);
        return null;
    }
};

const deleteBrand = async (id: number,admin: Admin): Promise<boolean | null> => {
    try {
        const deletedCount: number = await db<Brand>('brands')
            .where({ id, admin_id: admin.id })
            .delete();

        if (deletedCount > 0) {
            return true; 
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error deleting brand:', error);
        return null;
    }
}

export { createBrand, getBrand, deleteBrand };
