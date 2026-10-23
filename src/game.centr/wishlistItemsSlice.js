import { createSlice } from '@reduxjs/toolkit';

const wishlistItemsSlice = createSlice({
  name: 'wishlistItems',
  initialState: {
    items: [
      { wishlistId: 1, gameId: 1 },
      { wishlistId: 1, gameId: 2 },
      { wishlistId: 2, gameId: 2 },
    ],
  },
  reducers: {
    addGameToWishlist: (state, action) => {
      const { wishlistId, gameId } = action.payload;
      const exists = state.items.find(
        (i) => i.wishlistId === wishlistId && i.gameId === gameId
      );
      if (!exists) {
        state.items.push({ wishlistId, gameId });
      }
    },
    removeGameFromWishlist: (state, action) => {
      const { wishlistId, gameId } = action.payload;
      state.items = state.items.filter(
        (i) => !(i.wishlistId === wishlistId && i.gameId === gameId)
      );
    },
    removeAllGamesFromWishlist: (state, action) => {
      state.items = state.items.filter((i) => i.wishlistId !== action.payload);
    },
  },
});

export const { 
  addGameToWishlist, 
  removeGameFromWishlist, 
  removeAllGamesFromWishlist 
} = wishlistItemsSlice.actions;

export default wishlistItemsSlice.reducer;