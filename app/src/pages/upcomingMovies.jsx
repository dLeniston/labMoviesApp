import React from "react";
import Spinner from "../components/spinner";
import PageTemplate from '../components/templateMovieListPage'
import AddToFavouritesIcon from '../components/cardIcons/addToFavourites'
import { useQuery } from "react-query";
import { getUpcomingMovies } from "../api/tmdb-api";

const UpcomingMovies = (props) => {
  //const [movies, setMovies] = useState([]);
  const { data, error, isLoading, isError } = useQuery("upcoming", getUpcomingMovies);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  /*useEffect(() => {
    getUpcomingMovies().then(movies => {
      setMovies(movies);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);*/
  const movies = data ? data.results : [];

  return (
    <PageTemplate
      title='Upcoming Movies'
      movies={movies}
      action={(movie) => {
        return <AddToFavouritesIcon movie={movie} />
      }}
    />
  );
};
export default UpcomingMovies;