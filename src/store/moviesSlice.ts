import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Movie, MovieDetails, SearchParams } from '@/types';
import { movieAPI } from '@/lib/api';

interface MoviesState {
  trending: {
    movies: Movie[];
    loading: boolean;
    error: string | null;
  };
  popular: {
    movies: Movie[];
    loading: boolean;
    error: string | null;
    page: number;
    totalPages: number;
  };
  topRated: {
    movies: Movie[];
    loading: boolean;
    error: string | null;
  };
  nowPlaying: {
    movies: Movie[];
    loading: boolean;
    error: string | null;
  };
  upcoming: {
    movies: Movie[];
    loading: boolean;
    error: string | null;
  };
  search: {
    movies: Movie[];
    loading: boolean;
    error: string | null;
    query: string;
    page: number;
    totalPages: number;
  };
  movieDetails: {
    [key: number]: {
      data: MovieDetails | null;
      loading: boolean;
      error: string | null;
    };
  };
}

const initialState: MoviesState = {
  trending: {
    movies: [],
    loading: false,
    error: null,
  },
  popular: {
    movies: [],
    loading: false,
    error: null,
    page: 1,
    totalPages: 0,
  },
  topRated: {
    movies: [],
    loading: false,
    error: null,
  },
  nowPlaying: {
    movies: [],
    loading: false,
    error: null,
  },
  upcoming: {
    movies: [],
    loading: false,
    error: null,
  },
  search: {
    movies: [],
    loading: false,
    error: null,
    query: '',
    page: 1,
    totalPages: 0,
  },
  movieDetails: {},
};

export const fetchTrendingMovies = createAsyncThunk(
  'movies/fetchTrending',
  async (timeWindow: 'day' | 'week' = 'week') => {
    const response = await movieAPI.getTrendingMovies(timeWindow);
    return response;
  }
);

export const fetchPopularMovies = createAsyncThunk(
  'movies/fetchPopular',
  async (page: number = 1) => {
    const response = await movieAPI.getPopularMovies(page);
    return response;
  }
);

export const fetchTopRatedMovies = createAsyncThunk(
  'movies/fetchTopRated',
  async () => {
    const response = await movieAPI.getTopRatedMovies();
    return response;
  }
);

export const fetchNowPlayingMovies = createAsyncThunk(
  'movies/fetchNowPlaying',
  async () => {
    const response = await movieAPI.getNowPlayingMovies();
    return response;
  }
);

export const fetchUpcomingMovies = createAsyncThunk(
  'movies/fetchUpcoming',
  async () => {
    const response = await movieAPI.getUpcomingMovies();
    return response;
  }
);

export const searchMovies = createAsyncThunk(
  'movies/search',
  async (params: SearchParams) => {
    const response = await movieAPI.searchMovies(params);
    return { ...response, query: params.query || '' };
  }
);

export const fetchMovieDetails = createAsyncThunk(
  'movies/fetchDetails',
  async (movieId: number) => {
    const response = await movieAPI.getMovieDetails(movieId);
    return { movieId, data: response };
  }
);

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    clearSearch: (state) => {
      state.search = {
        movies: [],
        loading: false,
        error: null,
        query: '',
        page: 1,
        totalPages: 0,
      };
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.search.query = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrendingMovies.pending, (state) => {
        state.trending.loading = true;
        state.trending.error = null;
      })
      .addCase(fetchTrendingMovies.fulfilled, (state, action) => {
        state.trending.loading = false;
        state.trending.movies = action.payload.results;
      })
      .addCase(fetchTrendingMovies.rejected, (state, action) => {
        state.trending.loading = false;
        state.trending.error = action.error.message || 'Failed to fetch trending movies';
      })
      .addCase(fetchPopularMovies.pending, (state) => {
        state.popular.loading = true;
        state.popular.error = null;
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.popular.loading = false;
        state.popular.movies = action.payload.results;
        state.popular.page = action.payload.page;
        state.popular.totalPages = action.payload.total_pages;
      })
      .addCase(fetchPopularMovies.rejected, (state, action) => {
        state.popular.loading = false;
        state.popular.error = action.error.message || 'Failed to fetch popular movies';
      })
      .addCase(fetchTopRatedMovies.pending, (state) => {
        state.topRated.loading = true;
        state.topRated.error = null;
      })
      .addCase(fetchTopRatedMovies.fulfilled, (state, action) => {
        state.topRated.loading = false;
        state.topRated.movies = action.payload.results;
      })
      .addCase(fetchTopRatedMovies.rejected, (state, action) => {
        state.topRated.loading = false;
        state.topRated.error = action.error.message || 'Failed to fetch top rated movies';
      })
      .addCase(fetchNowPlayingMovies.pending, (state) => {
        state.nowPlaying.loading = true;
        state.nowPlaying.error = null;
      })
      .addCase(fetchNowPlayingMovies.fulfilled, (state, action) => {
        state.nowPlaying.loading = false;
        state.nowPlaying.movies = action.payload.results;
      })
      .addCase(fetchNowPlayingMovies.rejected, (state, action) => {
        state.nowPlaying.loading = false;
        state.nowPlaying.error = action.error.message || 'Failed to fetch now playing movies';
      })
      .addCase(fetchUpcomingMovies.pending, (state) => {
        state.upcoming.loading = true;
        state.upcoming.error = null;
      })
      .addCase(fetchUpcomingMovies.fulfilled, (state, action) => {
        state.upcoming.loading = false;
        state.upcoming.movies = action.payload.results;
      })
      .addCase(fetchUpcomingMovies.rejected, (state, action) => {
        state.upcoming.loading = false;
        state.upcoming.error = action.error.message || 'Failed to fetch upcoming movies';
      })
      .addCase(searchMovies.pending, (state) => {
        state.search.loading = true;
        state.search.error = null;
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.search.loading = false;
        state.search.movies = action.payload.results;
        state.search.query = action.payload.query;
        state.search.page = action.payload.page;
        state.search.totalPages = action.payload.total_pages;
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.search.loading = false;
        state.search.error = action.error.message || 'Failed to search movies';
      })
      .addCase(fetchMovieDetails.pending, (state, action) => {
        const movieId = action.meta.arg;
        if (!state.movieDetails[movieId]) {
          state.movieDetails[movieId] = {
            data: null,
            loading: false,
            error: null,
          };
        }
        state.movieDetails[movieId].loading = true;
        state.movieDetails[movieId].error = null;
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        const { movieId, data } = action.payload;
        state.movieDetails[movieId] = {
          data,
          loading: false,
          error: null,
        };
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        const movieId = action.meta.arg;
        state.movieDetails[movieId] = {
          data: null,
          loading: false,
          error: action.error.message || 'Failed to fetch movie details',
        };
      });
  },
});

export const { clearSearch, setSearchQuery } = moviesSlice.actions;
export default moviesSlice.reducer;