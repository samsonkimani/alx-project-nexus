'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { searchMovies } from '@/store/moviesSlice';
import { MovieGrid } from '@/components/ui/MovieGrid';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { Movie, FavoriteMovie } from '@/types';

const SearchContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0c0c0c 0%, #1a1a1a 100%);
  padding: 2rem 0;
`;

const SearchContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const SearchHeader = styled.div`
  margin-bottom: 2rem;
`;

const SearchTitle = styled.h1`
  color: #fff;
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const SearchQuery = styled.span`
  color: #667eea;
`;

const SearchMeta = styled.p`
  color: #888;
  font-size: 1rem;
  margin: 0;
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
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 auto;

  &:hover {
    background: #5a6fd8;
  }
`;

const SearchSuggestions = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  backdrop-filter: blur(10px);
`;

const SuggestionTitle = styled.h3`
  color: #fff;
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
`;

const SuggestionList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  color: #ccc;
  line-height: 1.6;
`;

const SuggestionItem = styled.li`
  margin: 0.5rem 0;

  &:before {
    content: '•';
    color: #667eea;
    margin-right: 0.5rem;
  }
`;

function SearchPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  const dispatch = useAppDispatch();
  const { search } = useAppSelector((state) => state.movies);

  useEffect(() => {
    if (query && query !== search.query) {
      dispatch(searchMovies({ query }));
    }
  }, [dispatch, query, search.query]);

  const handleMovieClick = (movie: Movie | FavoriteMovie) => {
    router.push(`/movies/${movie.id}`);
  };

  const handleBackToBrowse = () => {
    router.push('/');
  };

  const handleRetry = () => {
    if (query) {
      dispatch(searchMovies({ query }));
    }
  };

  if (!query) {
    return (
      <SearchContainer>
        <SearchContent>
          <EmptyState>
            <EmptyIcon>🔍</EmptyIcon>
            <EmptyTitle>No search query</EmptyTitle>
            <EmptyText>
              Please enter a search term to find movies.
            </EmptyText>
            <BackButton onClick={handleBackToBrowse}>
              ← Back to Browse
            </BackButton>
          </EmptyState>
        </SearchContent>
      </SearchContainer>
    );
  }

  return (
    <SearchContainer>
      <SearchContent>
        <SearchHeader>
          <SearchTitle>
            Search results for &ldquo;<SearchQuery>{query}</SearchQuery>&rdquo;
          </SearchTitle>
          {!search.loading && !search.error && (
            <SearchMeta>
              {search.movies.length > 0
                ? `Found ${search.movies.length} result${search.movies.length === 1 ? '' : 's'}`
                : 'No results found'}
            </SearchMeta>
          )}
        </SearchHeader>

        {search.loading && (
          <LoadingSpinner text="Searching for movies..." />
        )}

        {search.error && (
          <ErrorMessage
            title="Search failed"
            message={search.error}
            onRetry={handleRetry}
          />
        )}

        {!search.loading && !search.error && search.movies.length === 0 && (
          <>
            <EmptyState>
              <EmptyIcon>😕</EmptyIcon>
              <EmptyTitle>No movies found</EmptyTitle>
              <EmptyText>
                We couldn&apos;t find any movies matching &ldquo;{query}&rdquo;. Try adjusting your search terms.
              </EmptyText>
              <BackButton onClick={handleBackToBrowse}>
                ← Back to Browse
              </BackButton>
            </EmptyState>

            <SearchSuggestions>
              <SuggestionTitle>Search Tips:</SuggestionTitle>
              <SuggestionList>
                <SuggestionItem>Try different or more general keywords</SuggestionItem>
                <SuggestionItem>Check your spelling</SuggestionItem>
                <SuggestionItem>Use alternative movie titles or actor names</SuggestionItem>
                <SuggestionItem>Try searching for genres like &ldquo;action&rdquo; or &ldquo;comedy&rdquo;</SuggestionItem>
              </SuggestionList>
            </SearchSuggestions>
          </>
        )}

        {!search.loading && !search.error && search.movies.length > 0 && (
          <MovieGrid movies={search.movies} onMovieClick={handleMovieClick} />
        )}
      </SearchContent>
    </SearchContainer>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchPageContent />
    </Suspense>
  );
}