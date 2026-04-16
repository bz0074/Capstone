import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { loginUserAPI, signupUserAPI } from './authAPI'

const storedUser = JSON.parse(localStorage.getItem('user'))

export const signupUser = createAsyncThunk('auth/signup', async (userData, thunkAPI) => {
  try {
    return await signupUserAPI(userData)
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Signup failed')
  }
})

export const loginUser = createAsyncThunk('auth/login', async (userData, thunkAPI) => {
  try {
    return await loginUserAPI(userData)
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Login failed')
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: storedUser || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null
      localStorage.removeItem('user')
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        localStorage.setItem('user', JSON.stringify(action.payload))
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        localStorage.setItem('user', JSON.stringify(action.payload))
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer
