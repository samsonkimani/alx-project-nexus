import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FavoriteMovie } from '@/types';

interface FavoritesState {
  favorites: FavoriteMovie[];
  isInitialized: boolean;
}

const initialState: FavoritesState = {
  favorites: [],
  isInitialized: false,
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    initializeFavorites: (state, action: PayloadAction<FavoriteMovie[]>) => {
      state.favorites = action.payload;
      state.isInitialized = true;
    },
    addToFavorites: (state, action: PayloadAction<FavoriteMovie>) => {
      const existingIndex = state.favorites.findIndex(
        (movie) => movie.id === action.payload.id
      );

      if (existingIndex === -1) {
        state.favorites.push({
          ...action.payload,
          addedAt: new Date().toISOString(),
        });
      }
    },
    removeFromFavorites: (state, action: PayloadAction<number>) => {
      state.favorites = state.favorites.filter(
        (movie) => movie.id !== action.payload
      );
    },
    clearFavorites: (state) => {
      state.favorites = [];
    },
    reorderFavorites: (state, action: PayloadAction<{ fromIndex: number; toIndex: number }>) => {
      const { fromIndex, toIndex } = action.payload;
      const [movedItem] = state.favorites.splice(fromIndex, 1);
      state.favorites.splice(toIndex, 0, movedItem);
    },
  },
});

export const {
  initializeFavorites,
  addToFavorites,
  removeFromFavorites,
  clearFavorites,
  reorderFavorites,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;