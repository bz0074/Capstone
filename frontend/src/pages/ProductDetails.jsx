import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchProductById } from '../features/products/productSlice'
import { addToCart } from '../features/cart/cartSlice'
import Loader from '../components/Loader'
import formatCurrency from '../utils/formatCurrency'

const ProductDetails = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { product, loading, error } = useSelector((state) => state.products)

  useEffect(() => {
    dispatch(fetchProductById(id))
  }, [dispatch, id])

  if (loading) return <Loader />
  if (error) return <div className="container-custom py-8 text-red-600">{error}</div>
  if (!product) return null

  return (
    <div className="container-custom py-8">
      <div className="grid md:grid-cols-2 gap-8 card">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-96 object-cover rounded-xl"
        />

        <div>
          <p className="text-sm text-gray-500 mb-2">{product.category}</p>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-blue-600 font-bold text-2xl mb-4">
            {formatCurrency(product.price)}
          </p>
          <p className="text-gray-700 mb-6">{product.description}</p>

          <button
            onClick={() => dispatch(addToCart({ ...product, quantity: 1 }))}
            className="btn btn-primary"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
