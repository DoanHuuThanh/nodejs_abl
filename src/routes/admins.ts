import express, { Request, Response } from 'express';
import { authMiddleware } from '../middleware/authAdminMiddleware';
import { createBrand, getBrand, deleteBrand } from '../services/admin/brand';
import { Admin } from '../config/interface';
import { createCategory, deleteCategory, getCategory } from '../services/admin/category';

const router = express.Router();

interface RequestWithAdmin extends Request {
  admin?: Admin; 
}

router.post('/brands', authMiddleware, async (req: RequestWithAdmin, res: Response) => {
  try {
    if (req.admin) {
      const brand = await createBrand(req.body, req.admin);
      if (brand) {
        res.status(201).json({ brand: brand, status: 200, message: 'Brand creation successful' });
      } else {
        res.status(500).json({ status: 404, message: 'Brand not created' });
      }
    } else {
      res.status(401).json({ status: 401, message: 'Unauthorized' });
    }
  } catch (error) {
    res.status(500).json({ status: 500, message: 'Brand creation error' });
  }
});

router.get('/brands', authMiddleware, async (req: RequestWithAdmin, res: Response) => {
    try {
      if (req.admin) {
        const brand = await getBrand(req.admin);
        if (brand) {
          res.status(201).json({ items: brand, status: 200 });
        } else {
          res.status(500).json({ status: 404, message: 'Brand not created' });
        }
      } else {
        res.status(401).json({ status: 401, message: 'Unauthorized' });
      }
    } catch (error) {
      res.status(500).json({ status: 500, message: 'Brand creation error' });
    }
  });

  router.delete('/brands/:id', authMiddleware, async (req: RequestWithAdmin, res: Response) => {
    const id = parseInt(req.params.id);
    console.log(id)
    try {
      if (req.admin) {
        const brand = await deleteBrand(id,req.admin);
        if (brand) {
          res.status(201).json({ status: 200, message: 'Brand creation successful' });
        } else {
          res.status(500).json({ status: 404, message: 'Brand not created' });
        }
      } else {
        res.status(401).json({ status: 401, message: 'Unauthorized' });
      }
    } catch (error) {
      res.status(500).json({ status: 500, message: 'Brand creation error' });
    }
  });

  router.post('/category', authMiddleware, async (req: RequestWithAdmin, res: Response) => {
    try {
      if (req.admin) {
        const category = await createCategory(req.body, req.admin);
        if (category) {
          res.status(201).json({ category: category, status: 200, message: 'category creation successful' });
        } else {
          res.status(500).json({ status: 404, message: 'category not created' });
        }
      } else {
        res.status(401).json({ status: 401, message: 'Unauthorized' });
      }
    } catch (error) {
      res.status(500).json({ status: 500, message: 'category creation error' });
    }
  });
  
  router.get('/category', authMiddleware, async (req: RequestWithAdmin, res: Response) => {
      try {
        if (req.admin) {
          const categories = await getCategory(req.admin);
          if (categories) {
            res.status(201).json({ items: categories, status: 200 });
          } else {
            res.status(500).json({ status: 404, message: 'category not created' });
          }
        } else {
          res.status(401).json({ status: 401, message: 'Unauthorized' });
        }
      } catch (error) {
        res.status(500).json({ status: 500, message: 'category creation error' });
      }
    });
  
    router.delete('/category/:id', authMiddleware, async (req: RequestWithAdmin, res: Response) => {
      const id = parseInt(req.params.id);
      console.log(id)
      try {
        if (req.admin) {
          const category = await deleteCategory(id,req.admin);
          if (category) {
            res.status(201).json({ status: 200, message: 'category creation successful' });
          } else {
            res.status(500).json({ status: 404, message: 'category not created' });
          }
        } else {
          res.status(401).json({ status: 401, message: 'Unauthorized' });
        }
      } catch (error) {
        res.status(500).json({ status: 500, message: 'category creation error' });
      }
    });

export default router;
