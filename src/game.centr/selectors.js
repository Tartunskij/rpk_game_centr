// src/game.centr/selectors.js

// --- Фильтры ---
export const selectFilters = (state) => state.filters;

// --- Списки желаемого ---
export const selectWishlists = (state) => state.wishlists.items;

export const selectWishlistById = (state, id) => 
  state.wishlists.items.find((l) => l.id === id);

// --- Связующая таблица (Игры в списках) ---
export const selectWishlistItems = (state) => state.wishlistItems.items;

export const selectGamesInWishlist = (state, wishlistId) => 
  state.wishlistItems.items
    .filter((item) => item.wishlistId === wishlistId)
    .map((item) => item.gameId);

// --- Корзина (если используешь) ---
export const selectCart = (state) => state.cart;