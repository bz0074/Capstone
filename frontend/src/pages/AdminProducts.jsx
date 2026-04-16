import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createProduct, deleteProduct, fetchProducts } from '../features/products/productSlice'
import Loader from '../components/Loader'
import formatCurrency from '../utils/formatCurrency'

const AdminProducts = () => {
  const dispatch = useDispatch()
  const { products, loading, error } = useSelector((state) => state.products)

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    image: '',
    description: '',
  })

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(createProduct({ ...formData, price: Number(formData.price) }))
    setFormData({
      name: '',
      price: '',
      category: '',
      image: '',
      description: '',
    })
  }

  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold mb-6">Manage Products</h1>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Add Product</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input className="input" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
            <input className="input" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
            <input className="input" name="category" placeholder="Category" value={formData.category} onChange={handleChange} required />
            <input className="input" name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} required />
            <textarea className="input" name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
            <button className="btn btn-primary">Add Product</button>
          </form>
        </div>

        <div className="space-y-4">
          {loading && <Loader />}
          {error && <p className="text-red-600">{error}</p>}

          {products.map((product) => (
            <div key={product._id} className="card flex justify-between items-center gap-4">
              <div>
                <h3 className="font-semibold">{product.name}</h3>
                <p>{formatCurrency(product.price)}</p>
              </div>

              <button
                onClick={() => dispatch(deleteProduct(product._id))}
                className="btn btn-danger"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AdminProducts
