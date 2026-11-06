// src/actions/gamesActions.js
import { createSlice } from '@reduxjs/toolkit';
import GameAPI from '../service';

const initialState = {
  items: GameAPI.all(),
};

const gamesActions = createSlice({
  name: 'games',
  initialState,
  reducers: {
    
    addGame: (state, action) => {
      const maxId = state.items.reduce(
        (max, g) => (g.id > max ? g.id : max),
        0
      );
      state.items.push({ ...action.payload, id: maxId + 1 });
    },

    removeGame: (state, action) => {
      state.items = state.items.filter((g) => g.id !== action.payload);
    },

    updateGame: (state, action) => {
      const index = state.items.findIndex((g) => g.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload };
      }
    },

    toggleGameController: (state, action) => {
      const game = state.items.find((g) => g.id === action.payload);
      if (game) game.controller = !game.controller;
    },

    setGameStatus: (state, action) => {
      const { id, status } = action.payload;
      const game = state.items.find((g) => g.id === id);
      if (game) game.status = status;
    },

    resetGames: (state) => {
      state.items = GameAPI.all();
    },
  },
});

export const {
  addGame,
  removeGame,
  updateGame,
  toggleGameController,
  setGameStatus,
  resetGames,
} = gamesActions.actions;

export default gamesActions.reducer;