import db from '../../db/knex';
import { Admin, Category } from '../../config/interface';

const createCategory = async (category: Category, admin: Admin): Promise<Category | null> => {
    const { name } = category;
    try {
        const [newCategory] = await db<Category>('categories')
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
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error creating Category:', error);
        return null;
    }
};

const getCategory = async (admin: Admin): Promise<Category[] | null> => {
    try {
        const categories: Category[] = await db<Category>('categories')
        .where({ admin_id: admin.id })
        .select('*') as Category[];

        return categories;
    } catch (error) {
        console.error('Error creating Category:', error);
        return null;
    }
};

const deleteCategory = async (id: number,admin: Admin): Promise<boolean | null> => {
    try {
        const deletedCount: number = await db<Category>('categories')
            .where({ id, admin_id: admin.id })
            .delete();

        if (deletedCount > 0) {
            return true; 
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error deleting Category:', error);
        return null;
    }
}

export { createCategory, getCategory, deleteCategory };
