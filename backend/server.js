import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Baidaho API is running...')
})

app.get('/api/products', (req, res) => {
  res.json([
    {
      _id: '1',
      name: 'Baidaho Laptop',
      price: 999,
      category: 'Electronics',
      image: 'https://images.unsplash.com/photo-1517336714739-489689fd1ca8',
      description: 'A powerful laptop for work and study.',
    },
  ])
})

app.post('/api/auth/signup', (req, res) => {
  res.json({ message: 'Signup route works' })
})

app.post('/api/auth/login', (req, res) => {
  res.json({
    _id: '123',
    name: 'Baidaho',
    email: 'test@test.com',
    role: 'admin',
    token: 'fake-jwt-token',
  })
})

app.post('/api/orders', (req, res) => {
  res.json({ message: 'Order created successfully' })
})

app.get('/api/orders/my-orders', (req, res) => {
  res.json([])
})

app.get('/api/orders', (req, res) => {
  res.json([])
})

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
