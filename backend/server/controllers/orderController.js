import Order from '../models/Order.js'

export const createOrder = async (req, res, next) => {
  try {
    const { items, shippingAddress, totalAmount } = req.body

    if (!items || items.length === 0) {
      res.status(400)
      throw new Error('No order items')
    }

    if (!shippingAddress) {
      res.status(400)
      throw new Error('Shipping address is required')
    }

    const order = await Order.create({
      user: req.user._id,
      items,
      shippingAddress,
      totalAmount,
    })

    const populatedOrder = await Order.findById(order._id)
      .populate('user', 'name email')
      .populate('items.product', 'name image')

    res.status(201).json(populatedOrder)
  } catch (error) {
    next(error)
  }
}

export const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('items.product', 'name image')
      .sort({ createdAt: -1 })

    res.json(orders)
  } catch (error) {
    next(error)
  }
}

export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email')
      .populate('items.product', 'name image')
      .sort({ createdAt: -1 })

    res.json(orders)
  } catch (error) {
    next(error)
  }
}

export const markOrderDelivered = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)

    if (!order) {
      res.status(404)
      throw new Error('Order not found')
    }

    order.isDelivered = true
    order.deliveredAt = new Date()

    const updatedOrder = await order.save()
    res.json(updatedOrder)
  } catch (error) {
    next(error)
  }
}

export const markOrderPaid = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)

    if (!order) {
      res.status(404)
      throw new Error('Order not found')
    }

    order.isPaid = true
    order.paidAt = new Date()

    const updatedOrder = await order.save()
    res.json(updatedOrder)
  } catch (error) {
    next(error)
  }
}
