// src/game.centr/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],        
    total: 0,         
    count: 0,        
  },
  reducers: {
    addToCart: (state, action) => {
      const exists = state.items.find((i) => i.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
        state.total += action.payload.price;
        state.count += 1;
      }
    },
    removeFromCart: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) {
        state.total -= item.price;
        state.count -= 1;
        state.items = state.items.filter((i) => i.id !== action.payload);
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      state.count = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;