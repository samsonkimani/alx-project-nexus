# 🎬 MovieApp - Movie Recommendation Platform

A modern, responsive movie discovery and recommendation application built with Next.js, TypeScript, and Redux Toolkit. Discover trending movies, search for your favorites, and build your personal movie collection.

![MovieApp](https://img.shields.io/badge/Next.js-15.5.4-000000?style=flat&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat&logo=typescript)
![Redux](https://img.shields.io/badge/Redux_Toolkit-2.9.0-764ABC?style=flat&logo=redux)
![Styled Components](https://img.shields.io/badge/Styled_Components-6.1.19-DB7093?style=flat&logo=styled-components)

## ✨ Features

### 🎯 Core Functionality

#### **Movie Discovery Dashboard**
- **Trending Movies**: Display weekly trending movies from TMDB
- **Popular Movies**: Show currently popular movies with pagination
- **Top Rated**: Curated list of highest-rated movies
- **Now Playing**: Movies currently in theaters
- **Coming Soon**: Upcoming movie releases

#### **Advanced Search**
- **Real-time Search**: Instant movie search with autocomplete
- **Search Results**: Dedicated results page with query highlighting
- **Search Suggestions**: Helpful tips for better search results
- **Empty State Handling**: User-friendly messaging for no results

#### **Dynamic Movie Details**
- **Individual Movie Pages**: Detailed view for each movie (`/movies/[id]`)
- **Rich Information**: Synopsis, ratings, genres, release dates
- **High-Quality Images**: Poster and backdrop images from TMDB
- **Production Details**: Budget, revenue, runtime, production companies
- **Interactive Elements**: Favorite toggle, back navigation

#### **Personal Favorites System**
- **Local Storage**: Persistent favorites across browser sessions
- **Add/Remove**: One-click favorite toggling with visual feedback
- **Favorites Dashboard**: Dedicated page to manage saved movies
- **Statistics**: View collection stats (count, average rating, years)
- **Collection Management**: Sort and organize favorite movies

### 🎨 User Experience

#### **Responsive Design**
- **Mobile-First**: Optimized for all screen sizes
- **Adaptive Layouts**: Grid layouts that adjust to screen width
- **Touch-Friendly**: Large tap targets for mobile devices
- **Cross-Platform**: Consistent experience across devices

#### **Modern UI/UX**
- **Dark Theme**: Sleek dark interface with gradient backgrounds
- **Smooth Animations**: Hover effects, transitions, and micro-interactions
- **Loading States**: Skeleton screens and spinners for better UX
- **Error Handling**: Graceful error states with retry options

#### **Accessibility**
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Focus Management**: Visible focus indicators
- **Color Contrast**: WCAG compliant color schemes

## 🚀 Technologies Used

### **Frontend Framework**
- **Next.js 15**: React framework with App Router for SSR/SSG
- **React 19**: Latest React with concurrent features
- **TypeScript**: Full type safety and developer experience

### **State Management**
- **Redux Toolkit**: Modern Redux with minimal boilerplate
- **RTK Query**: Data fetching and caching
- **Redux DevTools**: Enhanced debugging capabilities

### **Styling & UI**
- **Styled Components**: CSS-in-JS with dynamic styling
- **Responsive Design**: Mobile-first approach with media queries
- **Custom Components**: Reusable UI component library

### **API Integration**
- **TMDB API**: The Movie Database for comprehensive movie data
- **RESTful Architecture**: Clean API service layer
- **Error Handling**: Robust error boundaries and retry logic

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── favorites/         # Favorites management page
│   ├── movies/[id]/       # Dynamic movie detail pages
│   ├── search/            # Search results page
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Homepage dashboard
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
│   ├── layout/           # Layout components
│   │   ├── Dashboard.tsx  # Main dashboard layout
│   │   └── Header.tsx     # Navigation header
│   ├── providers/        # Context providers
│   │   └── ReduxProvider.tsx
│   └── ui/               # UI components
│       ├── ErrorMessage.tsx
│       ├── LoadingSpinner.tsx
│       ├── MovieCard.tsx
│       ├── MovieGrid.tsx
│       ├── MovieSection.tsx
│       └── SearchBar.tsx
├── hooks/                # Custom React hooks
│   ├── redux.ts          # Typed Redux hooks
│   └── useFavorites.ts   # Favorites management hook
├── lib/                  # Utility libraries
│   └── api.ts            # TMDB API service layer
├── store/                # Redux store configuration
│   ├── favoritesSlice.ts # Favorites state management
│   ├── moviesSlice.ts    # Movies state management
│   └── index.ts          # Store configuration
├── types/                # TypeScript type definitions
│   ├── movie.ts          # Movie-related types
│   └── index.ts          # Type exports
└── utils/                # Utility functions
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+
- npm, yarn, pnpm, or bun
- TMDB API account and key

### 1. Clone Repository
```bash
git clone <repository-url>
cd alx-project-nexus
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Environment Configuration
Create a `.env.local` file in the root directory:

```env
# TMDB API Configuration
NEXT_PUBLIC_MOVIE_API_KEY=your_tmdb_api_key_here
NEXT_PUBLIC_MOVIE_API_BASE_URL=https://api.themoviedb.org/3
```

**Getting TMDB API Key:**
1. Visit [TMDB](https://www.themoviedb.org/)
2. Create a free account
3. Go to Settings → API
4. Generate a new API key
5. Copy the API key to your `.env.local` file

### 4. Run Development Server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📚 API Reference

### Movie API Service (`src/lib/api.ts`)

#### **Core Methods**
- `getTrendingMovies(timeWindow)` - Get trending movies (day/week)
- `getPopularMovies(page)` - Get popular movies with pagination
- `getTopRatedMovies(page)` - Get top-rated movies
- `getNowPlayingMovies(page)` - Get currently playing movies
- `getUpcomingMovies(page)` - Get upcoming releases

#### **Search & Discovery**
- `searchMovies({ query, page, year })` - Search movies by title
- `discoverMovies(params)` - Discover movies by filters
- `getMovieDetails(movieId)` - Get detailed movie information
- `getSimilarMovies(movieId)` - Get similar movie recommendations

#### **Utility Methods**
- `getImageUrl(path, size)` - Generate TMDB image URLs
- `getFullImageUrl(path)` - Get original quality images

## 🔄 State Management

### Redux Store Structure

#### **Movies Slice** (`moviesSlice.ts`)
```typescript
interface MoviesState {
  trending: { movies: Movie[], loading: boolean, error: string | null }
  popular: { movies: Movie[], loading: boolean, error: string | null, page: number }
  topRated: { movies: Movie[], loading: boolean, error: string | null }
  nowPlaying: { movies: Movie[], loading: boolean, error: string | null }
  upcoming: { movies: Movie[], loading: boolean, error: string | null }
  search: { movies: Movie[], query: string, loading: boolean, error: string | null }
  movieDetails: { [id: number]: { data: MovieDetails, loading: boolean, error: string | null } }
}
```

#### **Favorites Slice** (`favoritesSlice.ts`)
```typescript
interface FavoritesState {
  favorites: FavoriteMovie[]
  isInitialized: boolean
}
```

### Custom Hooks

#### **useFavorites Hook**
```typescript
const {
  favorites,           // Array of favorite movies
  addFavorite,        // Add movie to favorites
  removeFavorite,     // Remove movie from favorites
  isFavorite,         // Check if movie is favorited
  toggleFavorite,     // Toggle favorite status
  isInitialized       // Initialization status
} = useFavorites()
```

## 🎯 Key Features Deep Dive

### 1. **Movie Discovery Dashboard**
The main dashboard (`src/app/page.tsx`) showcases multiple movie categories:
- Fetches data from multiple TMDB endpoints simultaneously
- Displays movies in responsive grid layouts
- Includes loading states and error handling
- Implements retry mechanisms for failed requests

### 2. **Dynamic Routing System**
- **Movie Details**: `/movies/[id]` - Server-side rendered movie pages
- **Search Results**: `/search?q=query` - Dynamic search with URL parameters
- **Favorites**: `/favorites` - Personal collection management

### 3. **Favorites Management**
- Local storage persistence for offline access
- Real-time UI updates when adding/removing favorites
- Statistics dashboard with collection insights
- Cross-session data persistence

### 4. **Search Functionality**
- Real-time search with debouncing
- URL-based search state for shareable links
- Search suggestions and error handling
- Empty state management with helpful tips

### 5. **Responsive Design System**
- Mobile-first approach with progressive enhancement
- Flexible grid layouts that adapt to screen sizes
- Touch-optimized interactions for mobile devices
- Consistent spacing and typography scales

## 🧪 Testing & Quality

### **Build & Deployment**
```bash
# Development build
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

### **Type Safety**
- Full TypeScript coverage
- Strict type checking enabled
- Runtime type validation for API responses
- Type-safe Redux integration

## 🚀 Deployment

### **Vercel (Recommended)**
1. Connect your repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### **Manual Deployment**
```bash
# Build production assets
npm run build

# Start production server
npm start
```

### **Environment Variables**
Ensure the following variables are set in production:
- `NEXT_PUBLIC_MOVIE_API_KEY`
- `NEXT_PUBLIC_MOVIE_API_BASE_URL`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [TMDB](https://www.themoviedb.org/) for providing comprehensive movie data
- [Next.js](https://nextjs.org/) for the excellent React framework
- [Redux Toolkit](https://redux-toolkit.js.org/) for simplified state management
- [Styled Components](https://styled-components.com/) for powerful CSS-in-JS styling

## 📞 Support

For support, email your-email@example.com or open an issue on GitHub.

---

**Built with ❤️ using Next.js, TypeScript, and Redux Toolkit**
