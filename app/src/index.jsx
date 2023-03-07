import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import SiteHeader from './components/siteHeader'
import HomePage from "./pages/homePage";
import UpcomingMovies from "./pages/upcomingMovies";
import MoviePage from "./pages/movieDetailsPage";
import MovieReviewPage from "./pages/movieReviewPage";
import FavouriteMoviesPage from "./pages/favouriteMoviesPage"; // NEW

const App = () => {
  return (
    <BrowserRouter>
        <SiteHeader />      {/* New Header  */}
      <Routes>
        <Route path="/movies/upcoming" element={<UpcomingMovies />} />
        <Route path="/movies/favourites" element={<FavouriteMoviesPage />} />
        <Route path="/movies/:id" element={<MoviePage />} />
        <Route path="/reviews/:id" element={<MovieReviewPage/>} />
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

const rootElement = createRoot(document.getElementById("root"));
rootElement.render(<App />);

