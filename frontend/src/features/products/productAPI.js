import api from '../../api/axios'

export const getProductsAPI = async () => {
  const response = await api.get('/products')
  return response.data
}

export const getProductByIdAPI = async (id) => {
  const response = await api.get(`/products/${id}`)
  return response.data
}

export const createProductAPI = async (productData) => {
  const response = await api.post('/products', productData)
  return response.data
}

export const deleteProductAPI = async (id) => {
  const response = await api.delete(`/products/${id}`)
  return response.data
}
