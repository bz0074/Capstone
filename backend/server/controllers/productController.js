import Product from '../models/Product.js'

export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 })
    res.json(products)
  } catch (error) {
    next(error)
  }
}

export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)

    if (!product) {
      res.status(404)
      throw new Error('Product not found')
    }

    res.json(product)
  } catch (error) {
    next(error)
  }
}

export const createProduct = async (req, res, next) => {
  try {
    const { name, price, category, image, description, stock } = req.body

    if (!name || price === undefined || !category || !image || !description) {
      res.status(400)
      throw new Error('Please provide all required product fields')
    }

    const product = await Product.create({
      name,
      price,
      category,
      image,
      description,
      stock: stock ?? 0,
    })

    res.status(201).json(product)
  } catch (error) {
    next(error)
  }
}

export const updateProduct = async (req, res, next) => {
  try {
    const { name, price, category, image, description, stock } = req.body

    const product = await Product.findById(req.params.id)

    if (!product) {
      res.status(404)
      throw new Error('Product not found')
    }

    product.name = name ?? product.name
    product.price = price ?? product.price
    product.category = category ?? product.category
    product.image = image ?? product.image
    product.description = description ?? product.description
    product.stock = stock ?? product.stock

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } catch (error) {
    next(error)
  }
}

export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)

    if (!product) {
      res.status(404)
      throw new Error('Product not found')
    }

    await product.deleteOne()

    res.json({ message: 'Product deleted successfully' })
  } catch (error) {
    next(error)
  }
}
