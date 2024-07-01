import bcrypt from 'bcryptjs';

export async function seed(knex: any): Promise<void> {
  // Deletes ALL existing entries
  await knex('admins').del();

  // Inserts seed entries
  const hashedPassword = await bcrypt.hash('123456', 10);

  await knex('admins').insert([
    {
      id_login: '12345678',
      email: 'admin@example.com',
      password: hashedPassword,
      product_detail_template1: null,
      product_detail_template2: null,
      product_detail_template3: null,
    },
  ]);
}
