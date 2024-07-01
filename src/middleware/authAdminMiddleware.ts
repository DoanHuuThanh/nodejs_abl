import { Request, Response, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import db from '../db/knex'; 
import { Admin } from '../config/interface'; 

interface RequestWithUser extends Request {
  admin?: Admin; 
}

async function authMiddleware(req: RequestWithUser, res: Response, next: NextFunction) {
  const token: string | undefined = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ message: 'Không có token, xác thực bị từ chối' });
  }

  try {
    const secretKey: Secret = process.env.JWT_SECRET as Secret;

    const decoded: any = jwt.verify(token, secretKey);

    const userId: number = decoded.user.id; 

    const dbUser: Admin | undefined = await db('users').where({ id: userId }).first();

    if (!dbUser) {
      return res.status(404).json({ message: 'Người dùng không tồn tại' });
    }
  
    req.admin = dbUser; // Attach user object to request
    next();
  } catch (error) {
    console.error('Lỗi xác thực token:', error);
    res.status(401).json({ message: 'Token không hợp lệ' });
  }
}

export default authMiddleware;
