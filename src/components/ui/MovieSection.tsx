'use client';

import styled from 'styled-components';
import { Movie, FavoriteMovie } from '@/types';
import { MovieGrid } from './MovieGrid';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorMessage } from './ErrorMessage';

const Section = styled.section`
  margin-bottom: 3rem;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h2`
  color: #fff;
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const ViewAllButton = styled.button`
  background: transparent;
  border: 1px solid #667eea;
  color: #667eea;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #667eea;
    color: white;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  color: #888;
`;

const EmptyIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const EmptyText = styled.p`
  font-size: 1.125rem;
  margin: 0;
`;

interface MovieSectionProps {
  title: string;
  movies: Movie[];
  loading?: boolean;
  error?: string | null;
  onMovieClick?: (movie: Movie | FavoriteMovie) => void;
  onViewAll?: () => void;
  onRetry?: () => void;
}

export const MovieSection: React.FC<MovieSectionProps> = ({
  title,
  movies,
  loading = false,
  error = null,
  onMovieClick,
  onViewAll,
  onRetry
}) => {
  return (
    <Section>
      <SectionHeader>
        <SectionTitle>{title}</SectionTitle>
        {onViewAll && movies.length > 0 && (
          <ViewAllButton onClick={onViewAll}>
            View All
          </ViewAllButton>
        )}
      </SectionHeader>

      {loading && <LoadingSpinner text={`Loading ${title.toLowerCase()}...`} />}

      {error && (
        <ErrorMessage
          title="Failed to load movies"
          message={error}
          onRetry={onRetry}
        />
      )}

      {!loading && !error && movies.length === 0 && (
        <EmptyState>
          <EmptyIcon>🎬</EmptyIcon>
          <EmptyText>No movies found</EmptyText>
        </EmptyState>
      )}

      {!loading && !error && movies.length > 0 && (
        <MovieGrid movies={movies} onMovieClick={onMovieClick} />
      )}
    </Section>
  );
};