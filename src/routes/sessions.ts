import express, { Request, Response } from 'express';
import { registerUser } from '../services/sessions/register';
import { login } from '../services/sessions/login';
import { adminLogin } from '../services/sessions/admin-login';
import multer from 'multer';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/public/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

const uploadFields = upload.fields([
  { name: 'document_front', maxCount: 1 },
  { name: 'document_back', maxCount: 1 },
  { name: 'business_license_front', maxCount: 1 },
  { name: 'business_license_back', maxCount: 1 },
]);

router.post('/register', uploadFields, async (req: Request, res: Response) => {
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  const user = req.body;

  const fileUrls: { [fieldname: string]: string } = {};
  if (files.business_license_front) {
    fileUrls.business_license_front = `${req.protocol}://${req.get('host')}/public/uploads/${files.business_license_front[0].filename}`;
  }
  if (files.business_license_back) {
    fileUrls.business_license_back = `${req.protocol}://${req.get('host')}/public/uploads/${files.business_license_back[0].filename}`;
  }
  if (files.document_front) {
    fileUrls.document_front = `${req.protocol}://${req.get('host')}/public/uploads/${files.document_front[0].filename}`;
  }
  if (files.document_back) {
    fileUrls.document_back = `${req.protocol}://${req.get('host')}/public/uploads/${files.document_back[0].filename}`;
  }

  try {
    const newUser = await registerUser(user, fileUrls);
    res.status(201).json({ user: newUser, status: 200, message: 'Registration successful' });
  } catch (error) {
    res.status(500).json({ status: 404, message: 'Registration error' });
  }
});

router.post('/login', async (req: Request, res: Response) => {
  try {
    const authenticate = await login(req.body);
    if (authenticate) {
      res.status(201).json({ user: authenticate.user, token: authenticate.token, status: 200, message: 'Login successful' });
    } else {
      res.status(500).json({ status: 404, message: 'User not found' });
    }
    
  } catch (error) {
    res.status(500).json({ status: 404, message: 'Login error' });
  }
});

router.post('/admins/sign_in', async (req: Request, res: Response) => {
  try {
    const authenticate = await adminLogin(req.body);
    if (authenticate) {
      res.status(201).json({ admin: authenticate.admin, token: authenticate.token, status: 200, message: 'Login successful' });
    } else {
      res.status(500).json({ status: 404, message: 'User not found' });
    }
    
  } catch (error) {
    res.status(500).json({ status: 404, message: 'Login error' });
  }
})
export default router;
