import React, { useState } from "react";
import Spinner from "../components/spinner";
import PageTemplate from '../components/templateMovieListPage'
import AddToWatchlistIcon from '../components/cardIcons/addToWatchlist'
import { useQueries } from "react-query";
import MovieFilterUI, { titleFilter, genreFilter } from "../components/movieFilterUI";
import useFiltering from "../hooks/useFiltering";
import { fetchResource } from "../api/tmdb-api";
import { useAuth } from "../hooks/useAuth";
import { Pagination } from "@mui/material";

const titleFiltering = {
  name: "title",
  value: "",
  condition: titleFilter,
};
const genreFiltering = {
  name: "genre",
  value: "0",
  condition: genreFilter,
};

const UpcomingMovies = () => {
  const { session }  = useAuth();
  const { filterValues, setFilterValues, filterFunction } = useFiltering([],[titleFiltering, genreFiltering]);
  const [currPage, setCurrPage] = useState(1);
  const [recsPerPage] = useState(3);
  const pages = [1,2,3,4,5,6,7,8,9,10];

  // Create array of queries to get pages of movies in parallel.
  const getMovieQueries = useQueries(
    pages.map((page) => {
      return {
        queryKey: ["upcoming", { url: `${import.meta.env.VITE_MOVIES_API}/api/movies/upcoming?page=${page}`}],
        queryFn: fetchResource,
      };
    })
  );

  // Check if any of the parallel queries is still loading.
  const isLoading = getMovieQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  const allUpcomingMovies = getMovieQueries.map((q) => q.data["results"]);
  let consolidated = [];
  allUpcomingMovies.forEach(item => Array.prototype.push.apply(consolidated, item));
  consolidated = consolidated ? filterFunction(consolidated): [];
  const indexOfLastRecord = currPage * recsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recsPerPage;
  let displayedMovies = consolidated.slice(indexOfFirstRecord, indexOfLastRecord);
  const numOfPages = Math.ceil(consolidated.length / recsPerPage);

  const changeFilterValues = (type, value) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet =
      type === "title"
        ? [changedFilter, filterValues[1]]
        : [filterValues[0], changedFilter];
    setFilterValues(updatedFilterSet);
  };

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
          showFirstButton 
          showLastButton
      />
      <MovieFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
      />
  </>
  );
};
export default UpcomingMovies;