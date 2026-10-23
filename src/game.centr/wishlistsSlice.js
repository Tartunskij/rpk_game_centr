import { createSlice } from '@reduxjs/toolkit';

const wishlistsSlice = createSlice({
  name: 'wishlists',
  initialState: {
    items: [
      { id: 1, title: 'На Новый год' },
      { id: 2, title: 'Для PS5' },
    ],
  },
  reducers: {
    addWishlist: (state, action) => {
      const maxId = state.items.reduce((max, l) => (l.id > max ? l.id : max), 0);
      state.items.push({ ...action.payload, id: maxId + 1 });
    },
    removeWishlist: (state, action) => {
      state.items = state.items.filter((l) => l.id !== action.payload);
    },
  },
});

export const { addWishlist, removeWishlist } = wishlistsSlice.actions;
export default wishlistsSlice.reducer;