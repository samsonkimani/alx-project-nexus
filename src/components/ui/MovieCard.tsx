'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { Movie } from '@/types';
import { movieAPI } from '@/lib/api';
import { useFavorites } from '@/hooks/useFavorites';

interface MovieCardProps {
  movie: Movie;
  onMovieClick?: (movie: Movie) => void;
}

const Card = styled.div`
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  background: #1a1a1a;
  transition: all 0.3s ease;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  overflow: hidden;
`;

const MovieImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${Card}:hover & {
    transform: scale(1.05);
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    transparent 50%,
    rgba(0, 0, 0, 0.8) 100%
  );
  opacity: 0;
  transition: opacity 0.3s ease;

  ${Card}:hover & {
    opacity: 1;
  }
`;

const FavoriteButton = styled.button<{ $isfavorite: boolean }>`
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(0, 0, 0, 0.7);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: ${props => props.$isfavorite ? '#ff6b6b' : '#fff'};

  &:hover {
    background: rgba(0, 0, 0, 0.9);
    transform: scale(1.1);
  }
`;

const Rating = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  background: rgba(0, 0, 0, 0.8);
  color: #ffd700;
  padding: 4px 8px;
  border-radius: 16px;
  font-size: 0.875rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Content = styled.div`
  padding: 16px;
`;

const Title = styled.h3`
  color: #fff;
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 8px 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ReleaseDate = styled.p`
  color: #888;
  font-size: 0.875rem;
  margin: 0;
`;

const PlaceholderImage = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 1.125rem;
  font-weight: 600;
  text-align: center;
  padding: 20px;
`;

export const MovieCard: React.FC<MovieCardProps> = ({ movie, onMovieClick }) => {
  const [imageError, setImageError] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(movie);
  };

  const handleCardClick = () => {
    onMovieClick?.(movie);
  };

  const posterUrl = movie.poster_path
    ? movieAPI.getImageUrl(movie.poster_path, 'w342')
    : null;

  const formatDate = (dateString: string) => {
    if (!dateString) return 'TBA';
    const date = new Date(dateString);
    return date.getFullYear().toString();
  };

  return (
    <Card onClick={handleCardClick}>
      <ImageContainer>
        {posterUrl && !imageError ? (
          <MovieImage
            src={posterUrl}
            alt={movie.title}
            onError={() => setImageError(true)}
          />
        ) : (
          <PlaceholderImage>
            {movie.title}
          </PlaceholderImage>
        )}

        <Overlay />

        <FavoriteButton
          onClick={handleFavoriteClick}
          $isfavorite={isFavorite(movie.id)}
          aria-label={isFavorite(movie.id) ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorite(movie.id) ? '❤️' : '🤍'}
        </FavoriteButton>

        <Rating>
          ⭐ {movie.vote_average.toFixed(1)}
        </Rating>
      </ImageContainer>

      <Content>
        <Title>{movie.title}</Title>
        <ReleaseDate>{formatDate(movie.release_date)}</ReleaseDate>
      </Content>
    </Card>
  );
};