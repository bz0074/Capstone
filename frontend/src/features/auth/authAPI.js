import api from '../../api/axios'

export const signupUserAPI = async (userData) => {
  const response = await api.post('/auth/signup', userData)
  return response.data
}

export const loginUserAPI = async (userData) => {
  const response = await api.post('/auth/login', userData)
  return response.data
}
