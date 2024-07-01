export interface Admin {
    id: number;
    email: string;
    product_detail_template1?: string;
    product_detail_template2?: string;
    product_detail_template3?: string;
    id_login: string;
    created_at: Date;
    updated_at: Date;
  }
  
  export interface User {
    id: number;
    email: string;
    name?: string;
    zip_code?: string;
    address?: string;
    phone_number?: string;
    birth_day?: Date;
    line_name?: string;
    line_id?: string;
    business_license_front?: string;
    business_license_back?: string;
    document_front?: string;
    document_back?: string;
    id_login: string;
    delivery_person_name?: string;
    delivery_phone_number?: string;
    delivery_zip_code?: string;
    delivery_address?: string;
    status?: number;
    line_user_id?: string;
    created_at: Date;
    updated_at: Date;
  }
  
  export interface Rank {
    id: number;
    name?: string;
    admin_id: number;
    created_at: Date;
    updated_at: Date;
  }
  
  export interface StartingPrice {
    id: number;
    price: number;
    admin_id: number;
    created_at: Date;
    updated_at: Date;
  }
  
  export interface Category {
    id: number;
    name?: string;
    admin_id: number;
    created_at: Date;
    updated_at: Date;
  }
  
  export interface Brand {
    id: number;
    name?: string;
    admin_id: number;
    created_at: Date;
    updated_at: Date;
  }
  
  export interface Product {
    id: number;
    admin_id: number;
    category_id: number;
    brand_id: number;
    rank_id: number;
    starting_price_id: number;
    name?: string;
    description?: string;
    time_start?: Date;
    time_end?: Date;
    created_at: Date;
    updated_at: Date;
  }
  
  export interface ProductFile {
    id: number;
    file?: string;
    type?: number;
    product_id: number;
    created_at: Date;
    updated_at: Date;
  }
  
  export interface AuctionProduct {
    id: number;
    user_id: number;
    product_id: number;
    price: number;
    delivery_person_name?: string;
    delivery_phone_number?: string;
    delivery_zip_code?: string;
    delivery_address?: string;
    bid_time?: Date;
    created_at: Date;
    updated_at: Date;
  }
  