import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools'
import SiteHeader from './components/siteHeader'
import HomePage from "./pages/homePage";
import UpcomingMovies from "./pages/upcomingMovies";
import MoviePage from "./pages/movieDetailsPage";
import MovieReviewPage from "./pages/movieReviewPage";
import AddMovieReviewPage from './pages/addMovieReviewPage'
import FavouriteMoviesPage from "./pages/favouriteMoviesPage";
import MoviesContextProvider from "./contexts/moviesContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SiteHeader />
          <MoviesContextProvider>
            <Routes>
              <Route path="/movies/upcoming" element={<UpcomingMovies />} />
              <Route path="/movies/favourites" element={<FavouriteMoviesPage />} />
              <Route path="/reviews/form" element={<AddMovieReviewPage/>} />
              <Route path="/movies/:id" element={<MoviePage />} />
              <Route path="/reviews/:id" element={<MovieReviewPage/>} />
              <Route path="/" element={<HomePage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </MoviesContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

const rootElement = createRoot(document.getElementById("root"));
rootElement.render(<App />);

