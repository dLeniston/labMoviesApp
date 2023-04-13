import React from "react";
import { useParams } from "react-router-dom";
import { fetchResource } from '../api/tmdb-api'
import { useQuery } from "react-query";
import Spinner from '../components/spinner'
import MovieDetails from "../components/movieDetails";
import PageTemplate from "../components/templateMoviePage";

const MovieDetailsPage = () => {
  
  const { id } = useParams();

  const { data: movie, error, isLoading, isError } = useQuery(
    ["movie", { url: `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}` }],
    fetchResource
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <>
      {movie ? (
        <>
          <PageTemplate movie={movie}>
            <MovieDetails movie={movie} />
          </PageTemplate>
        </>
      ) : (
        <p>Waiting for movie details</p>
      )}
    </>
  );
};

export default MovieDetailsPage;

