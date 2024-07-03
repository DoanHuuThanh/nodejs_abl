import db from '../../db/knex';
import { Admin } from '../../config/interface';

interface ProductTemplate {
    product_detail_template1: string;
    product_detail_template2: string;
    product_detail_template3: string;
}

const updateProductTemplate = async (type: string, value: string, admin: Admin): Promise<ProductTemplate | null> => {
    try {
        const updateData: Partial<ProductTemplate> = {}; //Partial tao 1 object tu ProductTeamplate
  
        if (type === 'product_detail_template1') {
            updateData.product_detail_template1 = value;
        } else if (type === 'product_detail_template2') {
            updateData.product_detail_template2 = value;
        } else if (type === 'product_detail_template3') {
            updateData.product_detail_template3 = value;
        } else {
            throw new Error('Invalid template type');
        }

            const [updatedAdmin] = await db<Admin>('admins')
            .where({ id: admin.id })
            .update(updateData)
            .returning('*');

        if (updatedAdmin) {
            return {
                product_detail_template1: updatedAdmin.product_detail_template1 ?? '',
                product_detail_template2: updatedAdmin.product_detail_template2 ?? '',
                product_detail_template3: updatedAdmin.product_detail_template3 ?? ''
            };
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error updating product templates:', error);
        return null;
    }
};

const getProductTemplate = async (admin: Admin): Promise<ProductTemplate | null> => {
    try {
        return {
            product_detail_template1: admin.product_detail_template1 ?? '',
            product_detail_template2: admin.product_detail_template2 ?? '',
            product_detail_template3: admin.product_detail_template3 ?? ''
        };
    } catch (error) {
        console.error('Error creating Rank:', error);
        return null;
    }
};


export { updateProductTemplate, getProductTemplate };
