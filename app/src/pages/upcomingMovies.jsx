import React, { useState } from "react";
import Spinner from "../components/spinner";
import PageTemplate from '../components/templateMovieListPage'
import AddToWatchlistIcon from '../components/cardIcons/addToWatchlist'
import { useQueries } from "react-query";
import MovieFilterUI, { titleFilter, genreFilter } from "../components/movieFilterUI";
import { fetchResource } from "../api/tmdb-api";
import { useAuth } from "../hooks/useAuth";
import { Pagination } from "@mui/material";

const UpcomingMovies = () => {

  //const { data, error, isLoading, isError } = useQuery("upcoming", getUpcomingMovies);
  const { session }  = useAuth();
  const [currPage, setCurrPage] = useState(1);
  const [recsPerPage] = useState(12);
  const pages = [1,2,3,4,5,6,7,8,9,10];

  // Create array of queries to get pages of movies in parallel.
  const getMovieQueries = useQueries(
    pages.map((page) => {
      return {
        queryKey: ["upcoming", { url: `https://api.themoviedb.org/3/movie/upcoming?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=${page}`}],
        queryFn: fetchResource,
      };
    })
  );

  // Check if any of the parallel queries is still loading.
  const isLoading = getMovieQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  /*if (isError) {
    return <h1>{error.message}</h1>;
  }*/

  //const movies = data ? data.results : [];

  const allUpcomingMovies = getMovieQueries.map((q) => q.data["results"]);
  let consolidated = [];
  allUpcomingMovies.forEach(item => Array.prototype.push.apply(consolidated, item));
  consolidated = consolidated; //? filterFunction(consolidated): [];
  const indexOfLastRecord = currPage * recsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recsPerPage;
  let displayedMovies = consolidated.slice(indexOfFirstRecord, indexOfLastRecord);
  const numOfPages = Math.ceil(consolidated.length / recsPerPage);

  const handleChange = (e, p) => {
    setCurrPage(p);
  };

  return (
    <>
    {session ? (
      <PageTemplate
      title='Upcoming Movies'
      movies={displayedMovies}
      action={(movie) => {
        return <AddToWatchlistIcon movie={movie} />
      }}
    />
    ): (
      <PageTemplate
      title='Upcoming Movies'
      movies={displayedMovies}
      action={() => {}} />
    )}
      <Pagination
          count={numOfPages}
          page={currPage}
          onChange={handleChange}
          color="primary"
          size="large"
      />
  </>
  );
};
export default UpcomingMovies;