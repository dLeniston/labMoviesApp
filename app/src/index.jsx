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
import FavouriteMoviesPage from "./pages/favouriteMoviesPage";
import WatchlistMoviesPage from "./pages/watchlistMoviesPage";
import SignOut from "./components/logout";
import Login from "./components/login";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import themeStyle from "./theme";
import MoviesContextProvider from "./contexts/moviesContext";
import AuthContextProvider from "./contexts/authContext";
import CssBaseline from '@mui/material/CssBaseline';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});

const theme = createTheme(themeStyle);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthContextProvider>
          <MoviesContextProvider>
          <ThemeProvider theme={theme}>
              <SiteHeader />
              <CssBaseline />
                <Routes>
                  <Route path="/movies/upcoming" element={<UpcomingMovies />} />
                  <Route path="/movies/favourites" element={<FavouriteMoviesPage />} />
                  <Route path="/movies/watchlist" element={<WatchlistMoviesPage />} />
                  <Route path="/movies/:id" element={<MoviePage />} />
                  <Route path="/reviews/:id" element={<MovieReviewPage/>} />
                  <Route path="/" element={<HomePage />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/logout" element={<SignOut />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
                </ThemeProvider>
            </MoviesContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

const rootElement = createRoot(document.getElementById("root"));
rootElement.render(<App />);

