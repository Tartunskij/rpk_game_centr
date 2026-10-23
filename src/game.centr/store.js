import { configureStore } from '@reduxjs/toolkit';
import filtersReducer from './filtersSlice';
import wishlistsReducer from './wishlistsSlice';
import wishlistItemsReducer from './wishlistItemsSlice';

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    wishlists: wishlistsReducer,
    wishlistItems: wishlistItemsReducer,
    // cart: cartReducer,
  },
});

export default store;