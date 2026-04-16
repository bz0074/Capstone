import api from '../../api/axios'

export const createOrderAPI = async (orderData) => {
  const response = await api.post('/orders', orderData)
  return response.data
}

export const getMyOrdersAPI = async () => {
  const response = await api.get('/orders/my-orders')
  return response.data
}

export const getAllOrdersAPI = async () => {
  const response = await api.get('/orders')
  return response.data
}
