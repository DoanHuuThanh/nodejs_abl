import db from '../../db/knex';
import { Request } from 'express';
import {
  Product,
  Admin,
  ProductFile,
  AuctionProduct,
  Category,
  Rank,
  StartingPrice,
  Brand
} from '../../config/interface';
import { format } from 'date-fns';

interface RequestWithFiles extends Request {
  files?: Express.Multer.File[] | { [file: string]: Express.Multer.File[] };
  admin?: Admin;
}

interface NewProductFile {
  product_id: number;
  file: string;
  type: number;
}

interface GetProduct {
    id: number;
    admin_id: number;
    category_id: number;
    brand_id: number;
    rank_id: number;
    starting_price_id: number;
    price?: number;
    name?: string;
    description?: string;
    time_start: string;
    time_end: string;
    product_files?: ProductFile[];
    file: string; // Loại bỏ "| undefined" để đảm bảo kiểu dữ liệu là string
    category: string;
    brand: string;
    rank: string;
    user_id: number;
    starting_price: number;
    created_at: Date;
    updated_at: Date;
  }

const createProduct = async (req: RequestWithFiles): Promise<boolean> => {
  try {
    const files = req.files as Express.Multer.File[];
    const {
      name,
      description,
      starting_price_id,
      rank_id,
      category_id,
      brand_id,
    } = req.body;

    const time_start = format(
      new Date(req.body.time_start),
      'yyyy-MM-dd HH:mm:ss'
    );
    const time_end = format(new Date(req.body.time_end), 'yyyy-MM-dd HH:mm:ss');

    const [newProduct] = await db<Product>('products')
      .insert({
        admin_id: req.admin!.id,
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
      const productFiles: NewProductFile[] = files.map((file) => ({
        product_id: newProduct.id,
        file: `${req.protocol}://${req.get('host')}/uploads/${file.filename}`,
        type: file.mimetype.startsWith('image/') ? 1 : 2,
      }));

      await db<ProductFile>('product_files').insert(productFiles);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Error creating product:', error);
    return false;
  }
};

const getProductsWithDetails = async (adminId: number): Promise<GetProduct[] | null> => {
    try {
      const products: Product[] = await db<Product>('products')
        .where({ admin_id: adminId })
        .select('*');
  
      const productIds = products.map(product => product.id);
  
      const productFiles: ProductFile[] = await db<ProductFile>('product_files')
        .whereIn('product_id', productIds)
        .select('*');
  
      const categories: Category[] = await db<Category>('categories')
        .whereIn('id', products.map(product => product.category_id))
        .select('*');
  
      const brands: Brand[] = await db<Brand>('brands')
        .whereIn('id', products.map(product => product.brand_id))
        .select('*');
  
      const ranks: Rank[] = await db<Rank>('ranks')
        .whereIn('id', products.map(product => product.rank_id))
        .select('*');
  
      const startingPrices: StartingPrice[] = await db<StartingPrice>('starting_prices')
        .whereIn('id', products.map(product => product.starting_price_id))
        .select('*');
  
      const bids: AuctionProduct[] = await db<AuctionProduct>('auction_products')
        .whereIn('id', products.map(product => product.starting_price_id))
        .select('*');
  
  
   

      const formattedProducts: GetProduct[] = products.map(product => {
        const productFilesForProduct = productFiles.filter(file => file.product_id == product.id);
        const category = categories.find(category => category.id == product.category_id)?.name || '';
        const brand = brands.find(brand => brand.id == product.brand_id)?.name || '';
        const rank = ranks.find(rank => rank.id == product.rank_id)?.name || '';
        const startingPrice = startingPrices.find(price => price.id == product.starting_price_id)?.price || 0;
        console.log(product)
        const file = productFilesForProduct.length > 0 ? productFilesForProduct[productFilesForProduct.length - 1].file : '';
        const highestBid = bids.reduce((prevBid, currentBid) => {
            return currentBid.price > prevBid.price ? currentBid : prevBid;
          }, { price: 0, user_id: 0 });
          
  
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
          user_id: highestBid.user_id,
          starting_price: startingPrice,
          created_at: product.created_at,
          updated_at: product.updated_at,
        };
      });
  
      return formattedProducts;
    } catch (error) {
      console.error('Error fetching products:', error);
      return null;
    }
  };
export { createProduct, getProductsWithDetails };
