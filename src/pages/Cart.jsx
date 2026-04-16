import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromCart, updateQuantity } from '../features/cart/cartSlice'
import formatCurrency from '../utils/formatCurrency'

const Cart = () => {
  const dispatch = useDispatch()
  const { cartItems } = useSelector((state) => state.cart)

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)

  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="card">
          <p>Your cart is empty.</p>
          <Link to="/" className="text-blue-600 mt-3 inline-block">Go shopping</Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item._id} className="card flex flex-col md:flex-row gap-4 items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />

                <div className="flex-1 w-full">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-500">{formatCurrency(item.price)}</p>
                </div>

                <input
                  type="number"
                  min="1"
                  className="input w-24"
                  value={item.quantity}
                  onChange={(e) =>
                    dispatch(
                      updateQuantity({
                        id: item._id,
                        quantity: Number(e.target.value),
                      })
                    )
                  }
                />

                <button
                  onClick={() => dispatch(removeFromCart(item._id))}
                  className="btn btn-danger"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="card h-fit">
            <h2 className="text-xl font-bold mb-4">Summary</h2>
            <p className="mb-4">Total: <span className="font-bold">{formatCurrency(total)}</span></p>
            <Link to="/checkout" className="btn btn-primary w-full text-center">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart
