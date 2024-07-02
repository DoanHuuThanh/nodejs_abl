import { Request, Response, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import db from '../db/knex'; 
import { Admin } from '../config/interface'; 

interface RequestWitAdmin extends Request {
  admin?: Admin; 
}

async function authMiddleware(req: RequestWitAdmin, res: Response, next: NextFunction) {
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Không có token, xác thực bị từ chối' });
  }

  try {
    const secretKey: Secret = process.env.JWT_SECRET as Secret;

    const decoded: any = jwt.verify(token, secretKey);
    console.log(token)
    const adminId: number = decoded.admin.id; 

    const dbAdmin: Admin | undefined = await db('admins').where({ id: adminId }).first();

    if (!dbAdmin) {
      return res.status(404).json({ message: 'Người dùng không tồn tại' });
    }
  
    req.admin = dbAdmin; 
    next();
  } catch (error) {
    console.error('Lỗi xác thực token:', error);
    res.status(401).json({ message: 'Token không hợp lệ' });
  }
}

export { authMiddleware }
