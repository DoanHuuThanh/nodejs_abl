import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../../db/knex';

interface User {
  id_login: string;
  password: string;
}

interface DbUser {
  id: number;
  id_login: string;
  password: string;
  [key: string]: any;
}

interface LoginResponse {
  user: Omit<DbUser, 'password'>;
  token: string;
}

const login = async (user: User): Promise<LoginResponse | null> => {
  const { id_login, password } = user;

  try {
    const dbUser: DbUser | undefined = await db('users')
      .where({ id_login })
      .first();

    if (!dbUser) {
      console.error('Tài khoản không tồn tại');
      return null;
    }

    const isMatch = await bcrypt.compare(password, dbUser.password);
    if (!isMatch) {
      console.error('Mật khẩu không đúng');
      return null;
    }

    const payload = {
      user: {
        id: dbUser.id,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET || 'your_jwt_secret', {
      expiresIn: '1h',
    });

    const { password: _, ...userWithoutPassword } = dbUser;

    return { user: userWithoutPassword, token };
  } catch (error) {
    console.error('Lỗi đăng nhập:', error);
    throw new Error('Lỗi đăng nhập');
  }
};

export { login };
