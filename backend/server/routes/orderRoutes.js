import express from 'express'
import {
  createOrder,
  getAllOrders,
  getMyOrders,
  markOrderDelivered,
  markOrderPaid,
} from '../controllers/orderController.js'
import authMiddleware from '../middleware/authMiddleware.js'
import adminMiddleware from '../middleware/adminMiddleware.js'

const router = express.Router()

router.route('/').post(authMiddleware, createOrder).get(authMiddleware, adminMiddleware, getAllOrders)

router.get('/my-orders', authMiddleware, getMyOrders)
router.put('/:id/deliver', authMiddleware, adminMiddleware, markOrderDelivered)
router.put('/:id/pay', authMiddleware, adminMiddleware, markOrderPaid)

export default router
