import React, { useState} from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import { getMovies, discoverMovies } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import AddToFavouritesIcon from '../components/cardIcons/addToFavourites'
import Pagination from "../components/pagination";
import { useAuth } from "../hooks/useAuth";
import MovieFilterUI, {
  titleFilter,
  genreFilter,
} from "../components/movieFilterUI";
//import { Pagination } from "@mui/material";

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

const HomePage = (props) => {
  //const {data, error, isLoading, isError} = useQuery("discover", getMovies);
  const {data, error, isLoading, isError} = useQuery("discover", discoverMovies);
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [],
    [titleFiltering, genreFiltering]
  );
  
  const { session }  = useAuth();

  const [currPage, setCurrPage] = useState(1);
  const [recsPerPage] = useState(12);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const changeFilterValues = (type, value) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet =
      type === "title"
        ? [changedFilter, filterValues[1]]
        : [filterValues[0], changedFilter];
    setFilterValues(updatedFilterSet);
  };

  const movies = data ? data.results : [];
  //let displayedMovies = filterFunction(movies);

  const indexOfLastRecord = currPage * recsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recsPerPage;
  const displayedMovies = data["results"].slice(indexOfFirstRecord, indexOfLastRecord);
  const numOfPages = Math.ceil(data["results"].length / recsPerPage);

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
      <Pagination
        numOfPages={numOfPages}
        currPage={currPage}
        setCurrPage={setCurrPage}
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