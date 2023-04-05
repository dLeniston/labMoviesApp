import React from "react";
import Spinner from "../components/spinner";
import PageTemplate from '../components/templateMovieListPage'
import AddToWatchlistIcon from '../components/cardIcons/addToWatchlist'
import { useQuery } from "react-query";
import { getUpcomingMovies } from "../api/tmdb-api";
import { useAuth } from "../hooks/useAuth";

const UpcomingMovies = (props) => {

  const { data, error, isLoading, isError } = useQuery("upcoming", getUpcomingMovies);
  const { session }  = useAuth();

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data ? data.results : [];

  return (
    <>
    {session ? (
      <PageTemplate
      title='Upcoming Movies'
      movies={movies}
      action={(movie) => {
        return <AddToWatchlistIcon movie={movie} />
      }}
    />
    ): (
      <PageTemplate
      title='Upcoming Movies'
      movies={movies}
      action={() => {}} />
    )}
  </>
  );
};
export default UpcomingMovies;