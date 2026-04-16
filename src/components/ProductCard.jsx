import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '../features/cart/cartSlice'
import formatCurrency from '../utils/formatCurrency'

const ProductCard = ({ product }) => {
  const dispatch = useDispatch()

  return (
    <div className="card flex flex-col">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-52 object-cover rounded-lg mb-4"
      />

      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-sm text-gray-500 mb-2">{product.category}</p>
      <p className="font-bold text-blue-600 mb-3">{formatCurrency(product.price)}</p>

      <div className="mt-auto flex gap-2">
        <Link to={`/products/${product._id}`} className="btn btn-primary text-center flex-1">
          View
        </Link>
        <button
          onClick={() => dispatch(addToCart({ ...product, quantity: 1 }))}
          className="btn bg-green-600 text-white hover:bg-green-700 flex-1"
        >
          Add
        </button>
      </div>
    </div>
  )
}

export default ProductCard
