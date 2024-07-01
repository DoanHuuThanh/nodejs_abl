"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(knex) {
    await knex.schema
        .createTable('admins', table => {
        table.increments('id').primary();
        table.string('email').notNullable().unique().defaultTo('');
        table.string('password').notNullable().defaultTo('');
        table.string('product_detail_template1');
        table.string('product_detail_template2');
        table.string('product_detail_template3');
        table.string('id_login').notNullable().unique();
        table.timestamps(true, true);
    })
        .createTable('users', table => {
        table.increments('id').primary();
        table.string('email').notNullable().unique().defaultTo('');
        table.string('password').notNullable().defaultTo('');
        table.string('name');
        table.string('zip_code');
        table.string('address');
        table.string('phone_number');
        table.date('birth_day');
        table.string('line_name');
        table.string('line_id');
        table.string('business_license_front');
        table.string('business_license_back');
        table.string('document_front');
        table.string('document_back');
        table.string('id_login').unique();
        table.string('delivery_person_name');
        table.string('delivery_phone_number');
        table.string('delivery_zip_code');
        table.string('delivery_address');
        table.integer('status');
        table.string('line_user_id');
        table.timestamps(true, true);
    })
        .createTable('ranks', table => {
        table.increments('id').primary();
        table.string('name');
        table.bigInteger('admin_id').unsigned().notNullable().references('id').inTable('admins').onDelete('CASCADE');
        table.timestamps(true, true);
    })
        .createTable('starting_prices', table => {
        table.increments('id').primary();
        table.float('price');
        table.bigInteger('admin_id').unsigned().notNullable().references('id').inTable('admins').onDelete('CASCADE');
        table.timestamps(true, true);
    })
        .createTable('categories', table => {
        table.increments('id').primary();
        table.string('name');
        table.bigInteger('admin_id').unsigned().notNullable().references('id').inTable('admins').onDelete('CASCADE');
        table.timestamps(true, true);
    })
        .createTable('brands', table => {
        table.increments('id').primary();
        table.string('name');
        table.bigInteger('admin_id').unsigned().notNullable().references('id').inTable('admins').onDelete('CASCADE');
        table.timestamps(true, true);
    })
        .createTable('products', table => {
        table.increments('id').primary();
        table.bigInteger('admin_id').unsigned().notNullable().references('id').inTable('admins').onDelete('CASCADE');
        table.bigInteger('category_id').unsigned().notNullable().references('id').inTable('categories').onDelete('CASCADE');
        table.bigInteger('brand_id').unsigned().notNullable().references('id').inTable('brands').onDelete('CASCADE');
        table.bigInteger('rank_id').unsigned().notNullable().references('id').inTable('ranks').onDelete('CASCADE');
        table.bigInteger('starting_price_id').unsigned().notNullable().references('id').inTable('starting_prices').onDelete('CASCADE');
        table.string('name');
        table.text('description');
        table.datetime('time_start');
        table.datetime('time_end');
        table.timestamps(true, true);
    })
        .createTable('product_files', table => {
        table.increments('id').primary();
        table.string('file');
        table.integer('type');
        table.bigInteger('product_id').unsigned().notNullable().references('id').inTable('products').onDelete('CASCADE');
        table.timestamps(true, true);
    })
        .createTable('auction_products', table => {
        table.increments('id').primary();
        table.bigInteger('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
        table.bigInteger('product_id').unsigned().notNullable().references('id').inTable('products').onDelete('CASCADE');
        table.float('price');
        table.string('delivery_person_name');
        table.string('delivery_phone_number');
        table.string('delivery_zip_code');
        table.string('delivery_address');
        table.datetime('bid_time');
        table.timestamps(true, true);
    });
}
async function down(knex) {
    await knex.schema
        .dropTableIfExists('admins')
        .dropTableIfExists('auction_products')
        .dropTableIfExists('brands')
        .dropTableIfExists('categories')
        .dropTableIfExists('product_files')
        .dropTableIfExists('products')
        .dropTableIfExists('starting_prices')
        .dropTableIfExists('ranks')
        .dropTableIfExists('users');
}
//# sourceMappingURL=20240630173436_create_all_tables.js.map