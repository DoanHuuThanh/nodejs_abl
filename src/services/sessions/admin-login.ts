import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../../db/knex';

interface Admin {
  id_login: string;
  password: string;
}

interface DbAdmin {
  id: number;
  id_login: string;
  password: string;
  [key: string]: any;
}

interface LoginResponse {
  admin: Omit<DbAdmin, 'password'>;
  token: string;
}

const adminLogin = async (admin: Admin): Promise<LoginResponse | null> => {
  const { id_login, password } = admin;
  console.log(admin)
  console.log(id_login)
  try {
    console.log(id_login)
    const dbAdmin: DbAdmin | undefined = await db('admins')
      .where({ id_login })
      .first();

    if (!dbAdmin) {
      console.error('Tài khoản không tồn tại');
      return null; 
    }

    const isMatch = await bcrypt.compare(password, dbAdmin.password);
    if (!isMatch) {
      console.error('Mật khẩu không đúng');
      return null;
    }

    const payload = {
      admin: {
        id: dbAdmin.id,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET || 'your_jwt_secret', {
      expiresIn: '1h',
    });

    const { password: _, ...admin } = dbAdmin;

    return { admin: admin, token };
  } catch (error) {
    console.error('Lỗi đăng nhập:', error);
    throw new Error('Lỗi đăng nhập');
  }
};

export { adminLogin };
