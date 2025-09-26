'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import {
  fetchTrendingMovies,
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchNowPlayingMovies,
  fetchUpcomingMovies
} from '@/store/moviesSlice';
import { MovieSection } from '@/components/ui/MovieSection';
import { Movie, FavoriteMovie } from '@/types';

const DashboardContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0c0c0c 0%, #1a1a1a 100%);
  padding: 2rem 0;
`;

const DashboardContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const WelcomeSection = styled.section`
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem 0;
`;

const WelcomeTitle = styled.h1`
  color: #fff;
  font-size: 2.5rem;
  font-weight: 800;
  margin: 0 0 1rem 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const WelcomeSubtitle = styled.p`
  color: #ccc;
  font-size: 1.125rem;
  margin: 0;
  max-width: 600px;
  margin: 0 auto;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const Dashboard: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    trending,
    popular,
    topRated,
    nowPlaying,
    upcoming
  } = useAppSelector((state) => state.movies);

  useEffect(() => {
    dispatch(fetchTrendingMovies('week'));
    dispatch(fetchPopularMovies(1));
    dispatch(fetchTopRatedMovies());
    dispatch(fetchNowPlayingMovies());
    dispatch(fetchUpcomingMovies());
  }, [dispatch]);

  const handleMovieClick = (movie: Movie | FavoriteMovie) => {
    router.push(`/movies/${movie.id}`);
  };

  const handleRetryTrending = () => {
    dispatch(fetchTrendingMovies('week'));
  };

  const handleRetryPopular = () => {
    dispatch(fetchPopularMovies(1));
  };

  const handleRetryTopRated = () => {
    dispatch(fetchTopRatedMovies());
  };

  const handleRetryNowPlaying = () => {
    dispatch(fetchNowPlayingMovies());
  };

  const handleRetryUpcoming = () => {
    dispatch(fetchUpcomingMovies());
  };

  return (
    <DashboardContainer>
      <DashboardContent>
        <WelcomeSection>
          <WelcomeTitle>Discover Amazing Movies</WelcomeTitle>
          <WelcomeSubtitle>
            Explore trending films, find your new favorites, and get personalized recommendations
          </WelcomeSubtitle>
        </WelcomeSection>

        <MovieSection
          title="Trending This Week"
          movies={trending.movies.slice(0, 8)}
          loading={trending.loading}
          error={trending.error}
          onMovieClick={handleMovieClick}
          onRetry={handleRetryTrending}
        />

        <MovieSection
          title="Popular Movies"
          movies={popular.movies.slice(0, 8)}
          loading={popular.loading}
          error={popular.error}
          onMovieClick={handleMovieClick}
          onRetry={handleRetryPopular}
        />

        <MovieSection
          title="Top Rated"
          movies={topRated.movies.slice(0, 8)}
          loading={topRated.loading}
          error={topRated.error}
          onMovieClick={handleMovieClick}
          onRetry={handleRetryTopRated}
        />

        <MovieSection
          title="Now Playing"
          movies={nowPlaying.movies.slice(0, 8)}
          loading={nowPlaying.loading}
          error={nowPlaying.error}
          onMovieClick={handleMovieClick}
          onRetry={handleRetryNowPlaying}
        />

        <MovieSection
          title="Coming Soon"
          movies={upcoming.movies.slice(0, 8)}
          loading={upcoming.loading}
          error={upcoming.error}
          onMovieClick={handleMovieClick}
          onRetry={handleRetryUpcoming}
        />
      </DashboardContent>
    </DashboardContainer>
  );
};