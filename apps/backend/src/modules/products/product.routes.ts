import { Router } from 'express';
import * as productController from './product.controller.js';

const router = Router();

router.get('/search', productController.getByName);
router.get('/low-stock', productController.getLowStock);
router.get('/price-range', productController.getByPriceRange);
router.get('/category/:category', productController.getByCategory);
router.get('/:id', productController.getById);
router.get('/', productController.getAll);
router.post('/', productController.create);

export { router };