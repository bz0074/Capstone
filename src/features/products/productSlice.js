import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  createProductAPI,
  deleteProductAPI,
  getProductByIdAPI,
  getProductsAPI,
} from './productAPI'

export const fetchProducts = createAsyncThunk('products/fetchAll', async (_, thunkAPI) => {
  try {
    return await getProductsAPI()
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch products')
  }
})

export const fetchProductById = createAsyncThunk('products/fetchOne', async (id, thunkAPI) => {
  try {
    return await getProductByIdAPI(id)
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch product')
  }
})

export const createProduct = createAsyncThunk('products/create', async (productData, thunkAPI) => {
  try {
    return await createProductAPI(productData)
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to create product')
  }
})

export const deleteProduct = createAsyncThunk('products/delete', async (id, thunkAPI) => {
  try {
    await deleteProductAPI(id)
    return id
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to delete product')
  }
})

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    product: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false
        state.products = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(fetchProductById.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false
        state.product = action.payload
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.unshift(action.payload)
      })

      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((p) => p._id !== action.payload)
      })
  },
})

export default productSlice.reducer
