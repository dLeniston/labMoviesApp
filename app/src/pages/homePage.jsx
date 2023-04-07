import React, { useState, useEffect } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useQueries } from "react-query";
import Spinner from "../components/spinner";
import { discover } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import AddToFavouritesIcon from '../components/cardIcons/addToFavourites'
//import Pagination from "../components/pagination";
import { useAuth } from "../hooks/useAuth";
import MovieFilterUI, {
  titleFilter,
  genreFilter,
} from "../components/movieFilterUI";
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

const HomePage = () => {
  const { filterValues, setFilterValues, filterFunction } = useFiltering([],[titleFiltering, genreFiltering]);
  const { session }  = useAuth();
  const [currPage, setCurrPage] = useState(1);
  const [recsPerPage] = useState(12);
  const pages = [1,2,3,4,5,6,7,8,9,10];

  // Create array of queries to get pages of movies in parallel.
  const getMovieQueries = useQueries(
    pages.map((page) => {
      return {
        queryKey: ["discover", { url: `https://api.themoviedb.org/3/movie/upcoming?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=${page}`}],
        queryFn: discover,
      };
    })
  );

  // Check if any of the parallel queries is still loading.
  const isLoading = getMovieQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  const allMovies = getMovieQueries.map((q) => q.data["results"]);
  let consolidated = [];
  allMovies.forEach(item => Array.prototype.push.apply(consolidated, item));
  consolidated = consolidated ? filterFunction(consolidated): [];
  const indexOfLastRecord = currPage * recsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recsPerPage;
  let displayedMovies = consolidated.slice(indexOfFirstRecord, indexOfLastRecord);
  const numOfPages = Math.ceil(consolidated.length / recsPerPage)

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
        title="Discover Movies"
        movies={displayedMovies}
        action={(movie) => {
          return <AddToFavouritesIcon movie={movie} />
        }}
      />
    ):(<PageTemplate
      title="Discover Movies"
      movies={displayedMovies}
      action={() => {}} />
    )}
      {/*<Pagination
        numOfPages={numOfPages}
        currPage={currPage}
        setCurrPage={setCurrPage}
    />*/}
      <Pagination
        count={numOfPages}
        page={currPage}
        onChange={handleChange}
        color="primary"
        size="large"
      />
      <MovieFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
      />
    </>
  );
};

export default HomePage;