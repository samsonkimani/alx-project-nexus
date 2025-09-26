import { MovieDetails, MoviesResponse, SearchParams } from '@/types';

const API_KEY = process.env.NEXT_PUBLIC_MOVIE_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_MOVIE_API_BASE_URL;

if (!API_KEY || !BASE_URL) {
  console.warn('API configuration missing. Please check your environment variables.');
}

class MovieAPI {
  private async fetchFromAPI<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
    const url = new URL(`${BASE_URL}${endpoint}`);

    if (API_KEY) {
      url.searchParams.append('api_key', API_KEY);
    }

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value) url.searchParams.append(key, value);
      });
    }

    try {
      const response = await fetch(url.toString());

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Movie API Error:', error);
      throw error;
    }
  }

  async getTrendingMovies(timeWindow: 'day' | 'week' = 'week'): Promise<MoviesResponse> {
    return this.fetchFromAPI<MoviesResponse>(`/trending/movie/${timeWindow}`);
  }

  async getPopularMovies(page: number = 1): Promise<MoviesResponse> {
    return this.fetchFromAPI<MoviesResponse>('/movie/popular', {
      page: page.toString(),
    });
  }

  async getTopRatedMovies(page: number = 1): Promise<MoviesResponse> {
    return this.fetchFromAPI<MoviesResponse>('/movie/top_rated', {
      page: page.toString(),
    });
  }

  async getNowPlayingMovies(page: number = 1): Promise<MoviesResponse> {
    return this.fetchFromAPI<MoviesResponse>('/movie/now_playing', {
      page: page.toString(),
    });
  }

  async getUpcomingMovies(page: number = 1): Promise<MoviesResponse> {
    return this.fetchFromAPI<MoviesResponse>('/movie/upcoming', {
      page: page.toString(),
    });
  }

  async searchMovies({ query, page = 1, year }: SearchParams): Promise<MoviesResponse> {
    if (!query) {
      throw new Error('Search query is required');
    }

    const params: Record<string, string> = {
      query,
      page: page.toString(),
    };

    if (year) {
      params.year = year;
    }

    return this.fetchFromAPI<MoviesResponse>('/search/movie', params);
  }

  async getMovieDetails(movieId: number): Promise<MovieDetails> {
    return this.fetchFromAPI<MovieDetails>(`/movie/${movieId}`);
  }

  async getSimilarMovies(movieId: number, page: number = 1): Promise<MoviesResponse> {
    return this.fetchFromAPI<MoviesResponse>(`/movie/${movieId}/similar`, {
      page: page.toString(),
    });
  }

  async getMovieRecommendations(movieId: number, page: number = 1): Promise<MoviesResponse> {
    return this.fetchFromAPI<MoviesResponse>(`/movie/${movieId}/recommendations`, {
      page: page.toString(),
    });
  }

  async discoverMovies(params: {
    page?: number;
    genre?: string;
    year?: string;
    sortBy?: string;
    includeAdult?: boolean;
  } = {}): Promise<MoviesResponse> {
    const {
      page = 1,
      genre,
      year,
      sortBy = 'popularity.desc',
      includeAdult = false,
    } = params;

    const queryParams: Record<string, string> = {
      page: page.toString(),
      sort_by: sortBy,
      include_adult: includeAdult.toString(),
    };

    if (genre) {
      queryParams.with_genres = genre;
    }

    if (year) {
      queryParams.year = year;
    }

    return this.fetchFromAPI<MoviesResponse>('/discover/movie', queryParams);
  }

  getImageUrl(path: string, size: 'w185' | 'w342' | 'w500' | 'w780' | 'original' = 'w500'): string {
    if (!path) return '/placeholder-movie.jpg';
    return `https://image.tmdb.org/t/p/${size}${path}`;
  }

  getFullImageUrl(path: string): string {
    return this.getImageUrl(path, 'original');
  }
}

export const movieAPI = new MovieAPI();