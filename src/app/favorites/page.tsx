'use client';

import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { useFavorites } from '@/hooks/useFavorites';
import { MovieGrid } from '@/components/ui/MovieGrid';
import { Movie, FavoriteMovie } from '@/types';

const FavoritesContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0c0c0c 0%, #1a1a1a 100%);
  padding: 2rem 0;
`;

const FavoritesContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem 0;
`;

const PageTitle = styled.h1`
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

const PageSubtitle = styled.p`
  color: #ccc;
  font-size: 1.125rem;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 1rem;
  color: #888;
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1.5rem;
`;

const EmptyTitle = styled.h2`
  color: #fff;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
`;

const EmptyText = styled.p`
  font-size: 1.125rem;
  margin: 0 0 2rem 0;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
`;

const BackButton = styled.button`
  background: #667eea;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background: #5a6fd8;
  }
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  backdrop-filter: blur(10px);

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  color: #667eea;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
`;

const StatLabel = styled.div`
  color: #ccc;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export default function FavoritesPage() {
  const router = useRouter();
  const { favorites, isInitialized } = useFavorites();

  const handleMovieClick = (movie: Movie | FavoriteMovie) => {
    router.push(`/movies/${movie.id}`);
  };

  const handleBackToBrowse = () => {
    router.push('/');
  };

  if (!isInitialized) {
    return (
      <FavoritesContainer>
        <FavoritesContent>
          <PageHeader>
            <PageTitle>Loading...</PageTitle>
          </PageHeader>
        </FavoritesContent>
      </FavoritesContainer>
    );
  }

  const averageRating = favorites.length > 0
    ? (favorites.reduce((acc, movie) => acc + movie.vote_average, 0) / favorites.length).toFixed(1)
    : '0.0';

  return (
    <FavoritesContainer>
      <FavoritesContent>
        <PageHeader>
          <PageTitle>My Favorite Movies</PageTitle>
          <PageSubtitle>
            {favorites.length > 0
              ? `Your personal collection of ${favorites.length} favorite ${favorites.length === 1 ? 'movie' : 'movies'}`
              : 'Build your personal movie collection'}
          </PageSubtitle>
        </PageHeader>

        {favorites.length > 0 && (
          <StatsContainer>
            <StatItem>
              <StatValue>{favorites.length}</StatValue>
              <StatLabel>Favorites</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>{averageRating}</StatValue>
              <StatLabel>Avg Rating</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>
                {new Set(favorites.map(movie => new Date(movie.release_date).getFullYear())).size}
              </StatValue>
              <StatLabel>Years</StatLabel>
            </StatItem>
          </StatsContainer>
        )}

        {favorites.length === 0 ? (
          <EmptyState>
            <EmptyIcon>💫</EmptyIcon>
            <EmptyTitle>No favorites yet</EmptyTitle>
            <EmptyText>
              Start building your personal movie collection by clicking the heart icon on any movie you love.
            </EmptyText>
            <BackButton onClick={handleBackToBrowse}>
              Discover Movies
            </BackButton>
          </EmptyState>
        ) : (
          <MovieGrid movies={favorites} onMovieClick={handleMovieClick} />
        )}
      </FavoritesContent>
    </FavoritesContainer>
  );
}