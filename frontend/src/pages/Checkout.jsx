import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createOrder, resetOrderState } from '../features/orders/orderSlice'
import { clearCart } from '../features/cart/cartSlice'
import { useNavigate } from 'react-router-dom'
import formatCurrency from '../utils/formatCurrency'

const Checkout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { cartItems } = useSelector((state) => state.cart)
  const { success, loading, error } = useSelector((state) => state.orders)

  const [shippingAddress, setShippingAddress] = useState({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
  })

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)

  useEffect(() => {
    if (success) {
      dispatch(clearCart())
      dispatch(resetOrderState())
      navigate('/orders')
    }
  }, [success, dispatch, navigate])

  const handleChange = (e) => {
    setShippingAddress((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    dispatch(
      createOrder({
        items: cartItems.map((item) => ({
          product: item._id,
          quantity: item.quantity,
          price: item.price,
        })),
        shippingAddress,
        totalAmount: total,
      })
    )
  }

  return (
    <div className="container-custom py-8 max-w-3xl">
      <div className="card">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
          <input className="input" name="fullName" placeholder="Full Name" onChange={handleChange} required />
          <input className="input" name="address" placeholder="Address" onChange={handleChange} required />
          <input className="input" name="city" placeholder="City" onChange={handleChange} required />
          <input className="input" name="postalCode" placeholder="Postal Code" onChange={handleChange} required />
          <input className="input md:col-span-2" name="country" placeholder="Country" onChange={handleChange} required />

          <div className="md:col-span-2 border-t pt-4 mt-2">
            <p className="text-lg font-semibold mb-4">
              Total: {formatCurrency(total)}
            </p>
            <button className="btn btn-primary" disabled={loading}>
              {loading ? 'Processing...' : 'Place Order'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Checkout
