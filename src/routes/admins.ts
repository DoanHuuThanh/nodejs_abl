import express, { Request, Response } from 'express';
import { authMiddleware } from '../middleware/authAdminMiddleware';
import { createBrand, getBrand, deleteBrand } from '../services/admin/brand';
import { Admin } from '../config/interface';
import { createCategory, deleteCategory, getCategory } from '../services/admin/category';
import { createRank, deleteRank, getRank } from '../services/admin/rank';
import { createStartingPrice, deleteStartingPrice, getStartingPrice } from '../services/admin/start_price';
import { updateProductTemplate, getProductTemplate } from '../services/admin/product_template';
import { createProduct, getProductsWithDetails } from '../services/admin/product';
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

const fileFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
      cb(null, true);
  } else {
      cb(new Error('Invalid file type'), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

interface RequestWithAdmin extends Request {
  admin?: Admin; 
}

interface RequestWithFiles extends Request {
  files?: Express.Multer.File[] | { [file: string]: Express.Multer.File[] };
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

    //rank
    router.post('/rank', authMiddleware, async (req: RequestWithAdmin, res: Response) => {
      try {
        if (req.admin) {
          const rank = await createRank(req.body, req.admin);
          if (rank) {
            res.status(201).json({ rank: rank, status: 200, message: 'rank creation successful' });
          } else {
            res.status(500).json({ status: 404, message: 'rank not created' });
          }
        } else {
          res.status(401).json({ status: 401, message: 'Unauthorized' });
        }
      } catch (error) {
        res.status(500).json({ status: 500, message: 'rank creation error' });
      }
    });
    
    router.get('/rank', authMiddleware, async (req: RequestWithAdmin, res: Response) => {
        try {
          if (req.admin) {
            const ranks = await getRank(req.admin);
            if (ranks) {
              res.status(201).json({ items: ranks, status: 200 });
            } else {
              res.status(500).json({ status: 404, message: 'rank not created' });
            }
          } else {
            res.status(401).json({ status: 401, message: 'Unauthorized' });
          }
        } catch (error) {
          res.status(500).json({ status: 500, message: 'rank creation error' });
        }
      });
    
      router.delete('/rank/:id', authMiddleware, async (req: RequestWithAdmin, res: Response) => {
        const id = parseInt(req.params.id);
        console.log(id)
        try {
          if (req.admin) {
            const rank = await deleteRank(id,req.admin);
            if (rank) {
              res.status(201).json({ status: 200, message: 'rank creation successful' });
            } else {
              res.status(500).json({ status: 404, message: 'rank not created' });
            }
          } else {
            res.status(401).json({ status: 401, message: 'Unauthorized' });
          }
        } catch (error) {
          res.status(500).json({ status: 500, message: 'rank creation error' });
        }
      });

      //start_price
      router.post('/start_price', authMiddleware, async (req: RequestWithAdmin, res: Response) => {
        try {
          if (req.admin) {
            const start_price = await createStartingPrice(req.body, req.admin);
            if (start_price) {
              res.status(201).json({ start_price: start_price, status: 200, message: 'start_price creation successful' });
            } else {
              res.status(500).json({ status: 404, message: 'start_price not created' });
            }
          } else {
            res.status(401).json({ status: 401, message: 'Unauthorized' });
          }
        } catch (error) {
          res.status(500).json({ status: 500, message: 'start_price creation error' });
        }
      });
      
      router.get('/start_price', authMiddleware, async (req: RequestWithAdmin, res: Response) => {
          try {
            if (req.admin) {
              const start_prices = await getStartingPrice(req.admin);
              if (start_prices) {
                res.status(201).json({ items: start_prices, status: 200 });
              } else {
                res.status(500).json({ status: 404, message: 'start_price not created' });
              }
            } else {
              res.status(401).json({ status: 401, message: 'Unauthorized' });
            }
          } catch (error) {
            res.status(500).json({ status: 500, message: 'start_price creation error' });
          }
        });
      
        router.delete('/start_price/:id', authMiddleware, async (req: RequestWithAdmin, res: Response) => {
          const id = parseInt(req.params.id);
          console.log(id)
          try {
            if (req.admin) {
              const start_price = await deleteStartingPrice(id,req.admin);
              if (start_price) {
                res.status(201).json({ status: 200, message: 'start_price delete successful' });
              } else {
                res.status(500).json({ status: 404, message: 'start_price not deleted' });
              }
            } else {
              res.status(401).json({ status: 401, message: 'Unauthorized' });
            }
          } catch (error) {
            res.status(500).json({ status: 500, message: 'start_price delete error' });
          }
        });

    //product_template
    
    router.patch('/product_template', authMiddleware, async (req: RequestWithAdmin, res: Response) => {
      try {
        if (req.admin) {
          const type = req.body.type;
          const value = req.body.value;
  
          const product_template = await updateProductTemplate(type, value, req.admin);
          if (product_template) {
            res.status(201).json({ product_template1: product_template.product_detail_template1,product_template2: product_template.product_detail_template2,product_template3: product_template.product_detail_template3, status: 200, message: 'product_template creation successful' });
          } else {
            res.status(500).json({ status: 404, message: 'product_template not created' });
          }
        } else {
          res.status(401).json({ status: 401, message: 'Unauthorized' });
        }
      } catch (error) {
        res.status(500).json({ status: 500, message: 'product_template creation error' });
      }
    });
    
    router.get('/product_template', authMiddleware, async (req: RequestWithAdmin, res: Response) => {
        try {
          if (req.admin) {
            const product_template = await getProductTemplate(req.admin);
            if (product_template) {
              res.status(201).json({  product_template1: product_template.product_detail_template1,product_template2: product_template.product_detail_template2,product_template3: product_template.product_detail_template3, status: 200 });
            } else {
              res.status(500).json({ status: 404, message: 'product_template not created' });
            }
          } else {
            res.status(401).json({ status: 401, message: 'Unauthorized' });
          }
        } catch (error) {
          res.status(500).json({ status: 500, message: 'product_template creation error' });
        }
      });

      router.get('/product_template', authMiddleware, async (req: RequestWithAdmin, res: Response) => {
        try {
          if (req.admin) {
            const product_template = await getProductTemplate(req.admin);
            if (product_template) {
              res.status(201).json({  product_template1: product_template.product_detail_template1,product_template2: product_template.product_detail_template2,product_template3: product_template.product_detail_template3, status: 200 });
            } else {
              res.status(500).json({ status: 404, message: 'product_template not created' });
            }
          } else {
            res.status(401).json({ status: 401, message: 'Unauthorized' });
          }
        } catch (error) {
          res.status(500).json({ status: 500, message: 'product_template creation error' });
        }
      });

      //product 
      router.post('/product',authMiddleware, upload.array('file'), async (req: RequestWithFiles, res: Response) => {
            try {
              if (req.admin) {
                const product = await createProduct(req);
                if (product) {
                  res.status(201).json({ product: product , status: 200, message: "create product successful" });
                } else {
                  res.status(500).json({ status: 404, message: 'product not created' });
                }
              } else {
                res.status(401).json({ status: 401, message: 'Unauthorized' });
              }
            } catch (error) {
              res.status(500).json({ status: 500, message: 'product_template creation error' });
            }
    });


    router.get('/products',authMiddleware, async (req: RequestWithAdmin, res: Response) => {
      try {
        if (req.admin) {
          const product = await getProductsWithDetails(req.admin.id);
          if (product) {
            res.status(201).json({ product: product , status: 200, message: "create product successful" });
          } else {
            res.status(500).json({ status: 404, message: 'product not created' });
          }
        } else {
          res.status(401).json({ status: 401, message: 'Unauthorized' });
        }
      } catch (error) {
        res.status(500).json({ status: 500, message: 'product_template creation error' });
      }
   });



export default router;
