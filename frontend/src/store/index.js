// store/index.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; // Handles authentication state
import gameReducer from './gameSlice'; // Handles game state

const store = configureStore({
  reducer: {
    auth: authReducer,
    game: gameReducer,
  },
});

export default store;