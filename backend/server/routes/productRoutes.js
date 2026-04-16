import express from 'express'
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from '../controllers/productController.js'
import authMiddleware from '../middleware/authMiddleware.js'
import adminMiddleware from '../middleware/adminMiddleware.js'

const router = express.Router()

router.route('/').get(getProducts).post(authMiddleware, adminMiddleware, createProduct)

router
  .route('/:id')
  .get(getProductById)
  .put(authMiddleware, adminMiddleware, updateProduct)
  .delete(authMiddleware, adminMiddleware, deleteProduct)

export default router
