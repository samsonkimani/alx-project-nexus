'use client';

import styled from 'styled-components';
import { Movie, FavoriteMovie } from '@/types';
import { MovieCard } from './MovieCard';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 24px;
  padding: 0;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 12px;
  }
`;

interface MovieGridProps {
  movies: Movie[] | FavoriteMovie[];
  onMovieClick?: (movie: Movie | FavoriteMovie) => void;
}

const convertFavoriteToMovie = (favorite: FavoriteMovie): Movie => ({
  id: favorite.id,
  title: favorite.title,
  poster_path: favorite.poster_path,
  release_date: favorite.release_date,
  vote_average: favorite.vote_average,
  overview: '',
  backdrop_path: '',
  vote_count: 0,
  genre_ids: [],
  popularity: 0,
  adult: false,
  video: false,
  original_language: '',
  original_title: favorite.title,
});

export const MovieGrid: React.FC<MovieGridProps> = ({ movies, onMovieClick }) => {
  return (
    <Grid>
      {movies.map((movie) => {
        const movieData = 'addedAt' in movie ? convertFavoriteToMovie(movie) : movie;
        return (
          <MovieCard
            key={movie.id}
            movie={movieData}
            onMovieClick={onMovieClick}
          />
        );
      })}
    </Grid>
  );
};