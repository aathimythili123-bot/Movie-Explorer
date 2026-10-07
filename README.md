# Movie Explorer

React app to search and browse movies using the TMDB API.

**Live demo:** `https://<your-username>.github.io/movie-explorer/`

## Features
Search (debounced) · movie details with cast · rating badges · category (genre) filters · responsive layout · loading indicators · error handling with retry · shareable URLs (`#/?q=matrix&genre=28`).

## Setup
1. Get a free API key (v3) at https://www.themoviedb.org/settings/api
2. `cp .env.example .env` and paste your key
3. `npm install && npm run dev`

Without a key the app runs in demo mode with 6 sample movies.

## Structure
```
src/api/         tmdb.js (fetch + errors), mock.js (demo data)
src/hooks/       useAsync (loading/error/data + race protection), useDebounce
src/components/  SearchBar, CategoryFilter, MovieGrid, MovieCard, Rating, Loader, ErrorMessage
src/pages/       Home, MovieDetails
```

## Deploy (GitHub Pages)
Repo Settings > Pages > Source: GitHub Actions. Add a repository secret named `VITE_TMDB_API_KEY`. Push to `main`.
Note: a TMDB v3 key in a front-end app is visible in the browser. It is free and low-risk, but never reuse it for anything sensitive.

## Skills used
Components, Hooks (useState, useEffect, custom hooks), API integration, State management (URL params + local state), Routing (React Router v6).
