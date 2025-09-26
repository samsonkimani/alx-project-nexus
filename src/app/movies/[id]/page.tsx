'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { fetchMovieDetails } from '@/store/moviesSlice';
import { useFavorites } from '@/hooks/useFavorites';
import { movieAPI } from '@/lib/api';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorMessage } from '@/components/ui/ErrorMessage';

const MovieDetailContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0c0c0c 0%, #1a1a1a 100%);
`;

const BackdropSection = styled.div<{ $backdropUrl?: string }>`
  position: relative;
  height: 60vh;
  background: ${props => props.$backdropUrl
    ? `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.8)), url(${props.$backdropUrl})`
    : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: flex-end;
  padding: 2rem;

  @media (max-width: 768px) {
    height: 50vh;
    padding: 1rem;
  }
`;

const MovieInfo = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 2rem;
  align-items: end;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const PosterImage = styled.img`
  width: 200px;
  height: 300px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    width: 150px;
    height: 225px;
    margin: 0 auto;
  }
`;

const MovieMeta = styled.div`
  color: white;
`;

const MovieTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  margin: 0 0 0.5rem 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

const MovieTagline = styled.p`
  font-size: 1.125rem;
  font-style: italic;
  color: #ccc;
  margin: 0 0 1rem 0;
`;

const MovieRating = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const Rating = styled.div`
  background: rgba(0, 0, 0, 0.8);
  color: #ffd700;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const FavoriteButton = styled.button<{ $isFavorite: boolean }>`
  background: ${props => props.$isFavorite ? '#ff6b6b' : 'rgba(255, 255, 255, 0.2)'};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;

  &:hover {
    background: ${props => props.$isFavorite ? '#ff5252' : 'rgba(255, 255, 255, 0.3)'};
    transform: scale(1.05);
  }
`;

const ContentSection = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 3rem;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const MainContent = styled.div``;

const Sidebar = styled.div``;

const SectionTitle = styled.h2`
  color: #fff;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Overview = styled.p`
  color: #ccc;
  font-size: 1.125rem;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const DetailsList = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1.5rem;
  backdrop-filter: blur(10px);
`;

const DetailItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  &:last-child {
    border-bottom: none;
  }
`;

const DetailLabel = styled.span`
  color: #888;
  font-weight: 500;
`;

const DetailValue = styled.span`
  color: #fff;
  font-weight: 600;
`;

const GenreList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const GenreTag = styled.span`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.875rem;
  font-weight: 500;
`;

const BackButton = styled.button`
  position: absolute;
  top: 2rem;
  left: 2rem;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;

  &:hover {
    background: rgba(0, 0, 0, 0.9);
  }

  @media (max-width: 768px) {
    top: 1rem;
    left: 1rem;
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
  }
`;

export default function MovieDetailPage() {
  const router = useRouter();
  const params = useParams();
  const movieId = parseInt(params.id as string);

  const dispatch = useAppDispatch();
  const movieDetails = useAppSelector((state) => state.movies.movieDetails[movieId]);
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    if (movieId && !movieDetails) {
      dispatch(fetchMovieDetails(movieId));
    }
  }, [dispatch, movieId, movieDetails]);

  const handleBack = () => {
    router.back();
  };

  const handleToggleFavorite = () => {
    if (movieDetails?.data) {
      toggleFavorite(movieDetails.data);
    }
  };

  const handleRetry = () => {
    dispatch(fetchMovieDetails(movieId));
  };

  if (!movieDetails || movieDetails.loading) {
    return (
      <MovieDetailContainer>
        <LoadingSpinner text="Loading movie details..." />
      </MovieDetailContainer>
    );
  }

  if (movieDetails.error) {
    return (
      <MovieDetailContainer>
        <ErrorMessage
          title="Failed to load movie details"
          message={movieDetails.error}
          onRetry={handleRetry}
        />
      </MovieDetailContainer>
    );
  }

  const movie = movieDetails.data!;
  const backdropUrl = movie.backdrop_path
    ? movieAPI.getImageUrl(movie.backdrop_path, 'original')
    : undefined;
  const posterUrl = movie.poster_path
    ? movieAPI.getImageUrl(movie.poster_path, 'w500')
    : undefined;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <MovieDetailContainer>
      <BackdropSection $backdropUrl={backdropUrl}>
        <BackButton onClick={handleBack}>
          ← Back
        </BackButton>

        <MovieInfo>
          {posterUrl && (
            <PosterImage src={posterUrl} alt={movie.title} />
          )}

          <MovieMeta>
            <MovieTitle>{movie.title}</MovieTitle>
            {movie.tagline && (
              <MovieTagline>&ldquo;{movie.tagline}&rdquo;</MovieTagline>
            )}

            <MovieRating>
              <Rating>
                ⭐ {movie.vote_average.toFixed(1)}
              </Rating>
              <FavoriteButton
                $isFavorite={isFavorite(movie.id)}
                onClick={handleToggleFavorite}
              >
                {isFavorite(movie.id) ? '❤️' : '🤍'}
                {isFavorite(movie.id) ? 'Favorited' : 'Add to Favorites'}
              </FavoriteButton>
            </MovieRating>
          </MovieMeta>
        </MovieInfo>
      </BackdropSection>

      <ContentSection>
        <ContentGrid>
          <MainContent>
            <SectionTitle>Overview</SectionTitle>
            <Overview>{movie.overview}</Overview>

            {movie.genres && movie.genres.length > 0 && (
              <>
                <SectionTitle>Genres</SectionTitle>
                <GenreList>
                  {movie.genres.map((genre) => (
                    <GenreTag key={genre.id}>{genre.name}</GenreTag>
                  ))}
                </GenreList>
              </>
            )}
          </MainContent>

          <Sidebar>
            <SectionTitle>Details</SectionTitle>
            <DetailsList>
              <DetailItem>
                <DetailLabel>Release Date</DetailLabel>
                <DetailValue>
                  {new Date(movie.release_date).toLocaleDateString()}
                </DetailValue>
              </DetailItem>

              {movie.runtime && (
                <DetailItem>
                  <DetailLabel>Runtime</DetailLabel>
                  <DetailValue>{formatRuntime(movie.runtime)}</DetailValue>
                </DetailItem>
              )}

              <DetailItem>
                <DetailLabel>Rating</DetailLabel>
                <DetailValue>{movie.vote_average.toFixed(1)}/10</DetailValue>
              </DetailItem>

              <DetailItem>
                <DetailLabel>Votes</DetailLabel>
                <DetailValue>{movie.vote_count.toLocaleString()}</DetailValue>
              </DetailItem>

              {movie.budget > 0 && (
                <DetailItem>
                  <DetailLabel>Budget</DetailLabel>
                  <DetailValue>{formatCurrency(movie.budget)}</DetailValue>
                </DetailItem>
              )}

              {movie.revenue > 0 && (
                <DetailItem>
                  <DetailLabel>Revenue</DetailLabel>
                  <DetailValue>{formatCurrency(movie.revenue)}</DetailValue>
                </DetailItem>
              )}

              <DetailItem>
                <DetailLabel>Status</DetailLabel>
                <DetailValue>{movie.status}</DetailValue>
              </DetailItem>

              <DetailItem>
                <DetailLabel>Language</DetailLabel>
                <DetailValue>{movie.original_language.toUpperCase()}</DetailValue>
              </DetailItem>
            </DetailsList>
          </Sidebar>
        </ContentGrid>
      </ContentSection>
    </MovieDetailContainer>
  );
}