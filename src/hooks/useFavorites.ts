import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './redux';
import {
  initializeFavorites,
  addToFavorites,
  removeFromFavorites
} from '@/store/favoritesSlice';
import { FavoriteMovie, Movie } from '@/types';

const FAVORITES_STORAGE_KEY = 'movie-favorites';

export const useFavorites = () => {
  const dispatch = useAppDispatch();
  const { favorites, isInitialized } = useAppSelector((state) => state.favorites);

  useEffect(() => {
    if (!isInitialized) {
      const savedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
      if (savedFavorites) {
        try {
          const parsed = JSON.parse(savedFavorites) as FavoriteMovie[];
          dispatch(initializeFavorites(parsed));
        } catch (error) {
          console.error('Error parsing favorites from localStorage:', error);
          dispatch(initializeFavorites([]));
        }
      } else {
        dispatch(initializeFavorites([]));
      }
    }
  }, [dispatch, isInitialized]);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    }
  }, [favorites, isInitialized]);

  const addFavorite = (movie: Movie) => {
    const favoriteMovie: FavoriteMovie = {
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      release_date: movie.release_date,
      vote_average: movie.vote_average,
      addedAt: new Date().toISOString(),
    };
    dispatch(addToFavorites(favoriteMovie));
  };

  const removeFavorite = (movieId: number) => {
    dispatch(removeFromFavorites(movieId));
  };

  const isFavorite = (movieId: number) => {
    return favorites.some((movie) => movie.id === movieId);
  };

  const toggleFavorite = (movie: Movie) => {
    if (isFavorite(movie.id)) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    toggleFavorite,
    isInitialized,
  };
};