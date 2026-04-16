import { createSlice } from '@reduxjs/toolkit'

const storedCart = JSON.parse(localStorage.getItem('cartItems')) || []

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: storedCart,
  },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload
      const existing = state.cartItems.find((x) => x._id === item._id)

      if (existing) {
        existing.quantity += 1
      } else {
        state.cartItems.push(item)
      }

      localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((item) => item._id !== action.payload)
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload
      const item = state.cartItems.find((x) => x._id === id)

      if (item) {
        item.quantity = quantity
      }

      localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },

    clearCart: (state) => {
      state.cartItems = []
      localStorage.removeItem('cartItems')
    },
  },
})

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer
