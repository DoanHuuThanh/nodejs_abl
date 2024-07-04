"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductsWithDetails = exports.createProduct = void 0;
const knex_1 = __importDefault(require("../../db/knex"));
const date_fns_1 = require("date-fns");
const createProduct = async (req) => {
    try {
        const files = req.files;
        const { name, description, starting_price_id, rank_id, category_id, brand_id, } = req.body;
        const time_start = (0, date_fns_1.format)(new Date(req.body.time_start), 'yyyy-MM-dd HH:mm:ss');
        const time_end = (0, date_fns_1.format)(new Date(req.body.time_end), 'yyyy-MM-dd HH:mm:ss');
        const [newProduct] = await (0, knex_1.default)('products')
            .insert({
            admin_id: req.admin.id,
            name,
            description,
            time_start,
            time_end,
            starting_price_id,
            rank_id,
            category_id,
            brand_id,
        })
            .returning('*');
        console.log(newProduct);
        if (newProduct) {
            const productFiles = files.map((file) => ({
                product_id: newProduct.id,
                file: `${req.protocol}://${req.get('host')}/uploads/${file.filename}`,
                type: file.mimetype.startsWith('image/') ? 1 : 2,
            }));
            await (0, knex_1.default)('product_files').insert(productFiles);
            return true;
        }
        else {
            return false;
        }
    }
    catch (error) {
        console.error('Error creating product:', error);
        return false;
    }
};
exports.createProduct = createProduct;
const getProductsWithDetails = async (adminId) => {
    try {
        const products = await (0, knex_1.default)('products')
            .where({ admin_id: adminId })
            .select('*');
        const productIds = products.map(product => product.id);
        const productFiles = await (0, knex_1.default)('product_files')
            .whereIn('product_id', productIds)
            .select('*');
        const categories = await (0, knex_1.default)('categories')
            .whereIn('id', products.map(product => product.category_id))
            .select('*');
        const brands = await (0, knex_1.default)('brands')
            .whereIn('id', products.map(product => product.brand_id))
            .select('*');
        const ranks = await (0, knex_1.default)('ranks')
            .whereIn('id', products.map(product => product.rank_id))
            .select('*');
        const startingPrices = await (0, knex_1.default)('starting_prices')
            .whereIn('id', products.map(product => product.starting_price_id))
            .select('*');
        const bids = await (0, knex_1.default)('auction_products')
            .whereIn('id', products.map(product => product.starting_price_id))
            .select('*');
        const formattedProducts = products.map(product => {
            const productFilesForProduct = productFiles.filter(file => file.product_id == product.id);
            const category = categories.find(category => category.id == product.category_id)?.name || '';
            const brand = brands.find(brand => brand.id == product.brand_id)?.name || '';
            const rank = ranks.find(rank => rank.id == product.rank_id)?.name || '';
            const startingPrice = startingPrices.find(price => price.id == product.starting_price_id)?.price || 0;
            console.log(productFiles);
            const file = productFilesForProduct.length > 0 ? productFilesForProduct[productFilesForProduct.length - 1].file : '';
            const highestBid = bids.reduce((prevBid, currentBid) => {
                return currentBid.price > prevBid.price ? currentBid : prevBid;
            }, { price: 0 });
            return {
                id: product.id,
                admin_id: product.admin_id,
                category_id: product.category_id,
                brand_id: product.brand_id,
                rank_id: product.rank_id,
                starting_price_id: product.starting_price_id,
                name: product.name,
                description: product.description,
                time_start: product.time_start || '',
                time_end: product.time_end || '',
                product_files: productFilesForProduct,
                file: file || '',
                category,
                brand,
                rank,
                price: highestBid.price,
                starting_price: startingPrice,
                created_at: product.created_at,
                updated_at: product.updated_at,
            };
        });
        return formattedProducts;
    }
    catch (error) {
        console.error('Error fetching products:', error);
        return null;
    }
};
exports.getProductsWithDetails = getProductsWithDetails;
//# sourceMappingURL=product.js.map