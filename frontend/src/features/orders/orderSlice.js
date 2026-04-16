import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createOrderAPI, getAllOrdersAPI, getMyOrdersAPI } from './orderAPI'

export const createOrder = createAsyncThunk('orders/create', async (orderData, thunkAPI) => {
  try {
    return await createOrderAPI(orderData)
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to create order')
  }
})

export const fetchMyOrders = createAsyncThunk('orders/myOrders', async (_, thunkAPI) => {
  try {
    return await getMyOrdersAPI()
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch orders')
  }
})

export const fetchAllOrders = createAsyncThunk('orders/allOrders', async (_, thunkAPI) => {
  try {
    return await getAllOrdersAPI()
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch admin orders')
  }
})

const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    adminOrders: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetOrderState: (state) => {
      state.success = false
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.orders.unshift(action.payload)
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(fetchMyOrders.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchMyOrders.fulfilled, (state, action) => {
        state.loading = false
        state.orders = action.payload
      })
      .addCase(fetchMyOrders.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false
        state.adminOrders = action.payload
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { resetOrderState } = orderSlice.actions
export default orderSlice.reducer
