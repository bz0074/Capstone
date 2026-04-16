import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllOrders } from '../features/orders/orderSlice'
import Loader from '../components/Loader'
import formatCurrency from '../utils/formatCurrency'

const AdminOrders = () => {
  const dispatch = useDispatch()
  const { adminOrders, loading, error } = useSelector((state) => state.orders)

  useEffect(() => {
    dispatch(fetchAllOrders())
  }, [dispatch])

  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold mb-6">All Orders</h1>

      {loading && <Loader />}
      {error && <p className="text-red-600">{error}</p>}

      <div className="space-y-4">
        {adminOrders.map((order) => (
          <div key={order._id} className="card">
            <p className="font-semibold">Order ID: {order._id}</p>
            <p>User: {order.user?.name || 'Unknown'}</p>
            <p>Total: {formatCurrency(order.totalAmount)}</p>
            <p>Paid: {order.isPaid ? 'Yes' : 'No'}</p>
            <p>Delivered: {order.isDelivered ? 'Yes' : 'No'}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminOrders
