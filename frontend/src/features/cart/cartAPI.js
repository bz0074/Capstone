import api from '../../api/axios'

export const saveCartAPI = async (cartItems) => {
  const response = await api.post('/cart', { items: cartItems })
  return response.data
}

export const getCartAPI = async () => {
  const response = await api.get('/cart')
  return response.data
}
