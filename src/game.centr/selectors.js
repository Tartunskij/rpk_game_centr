export const selectFilters = (state) => state.filters;

export const selectWishlists = (state) => state.wishlists.items;

export const selectWishlistById = (state, id) => 
  state.wishlists.items.find((l) => l.id === id);

export const selectWishlistItems = (state) => state.wishlistItems.items;

export const selectGamesInWishlist = (state, wishlistId) => 
  state.wishlistItems.items
    .filter((item) => item.wishlistId === wishlistId)
    .map((item) => item.gameId);

export const selectCart = (state) => state.cart;