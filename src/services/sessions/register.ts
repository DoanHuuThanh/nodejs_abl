import bcrypt from 'bcryptjs';
import knex from '../../db/knex';

interface UserData {
  line_id: string;
  line_name: string;
  birth_day: string; // hoặc có thể là Date tùy thuộc vào cấu trúc của database
  email: string;
  phone_number: string;
  address: string;
  zip_code: string;
  name: string;
  delivery_person_name: string;
  delivery_zip_code: string;
  delivery_address: string;
  delivery_phone_number: string;
  id_login: string;
  password: string;
}

interface FileData {
  business_license_front?: string;
  business_license_back?: string;
  document_front?: string;
  document_back?: string;
}

const registerUser = async (userData: UserData, file: FileData) => {
  console.log(file);
  console.log(userData);

  const {
    line_id,
    line_name,
    birth_day,
    email,
    phone_number,
    address,
    zip_code,
    name,
    delivery_person_name,
    delivery_zip_code,
    delivery_address,
    delivery_phone_number,
    id_login,
    password,
  } = userData;

  const {
    business_license_front,
    business_license_back,
    document_front,
    document_back,
  } = file;

  const hashedPassword = await bcrypt.hash(password, 10);
  const formattedBirthDay = new Date(birth_day).toISOString(); // đổi định dạng ngày mới thêm vào database được

  const newUser = await knex('users').insert({
    line_id,
    line_name,
    birth_day: formattedBirthDay,
    email,
    phone_number,
    address,
    zip_code,
    name,
    delivery_person_name,
    delivery_zip_code,
    delivery_address,
    delivery_phone_number,
    id_login,
    business_license_front,
    business_license_back,
    document_front,
    document_back,
    password: hashedPassword,
  }).returning('*');

  return newUser;
};

export { registerUser };
