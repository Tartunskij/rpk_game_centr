// src/game.centr/filtersSlice.js
import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    search: '',           
    platform: 'all',      
    sortBy: 'id',         
    sortDir: 'asc',      
    onlyWithController: false, 
  },
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setPlatform: (state, action) => {
      state.platform = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    toggleSortDir: (state) => {
      state.sortDir = state.sortDir === 'asc' ? 'desc' : 'asc';
    },
    toggleControllerFilter: (state) => {
      state.onlyWithController = !state.onlyWithController;
    },
    resetFilters: (state) => {
      state.search = '';
      state.platform = 'all';
      state.sortBy = 'id';
      state.sortDir = 'asc';
      state.onlyWithController = false;
    },
  },
});

export const {
  setSearch,
  setPlatform,
  setSortBy,
  toggleSortDir,
  toggleControllerFilter,
  resetFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;