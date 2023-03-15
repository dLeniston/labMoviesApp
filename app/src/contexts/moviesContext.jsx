import React, { useState } from "react";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [favourites, setFavourites] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [myReviews, setMyReviews] = useState( {} )

  const addToFavourites = (movie) => {
    let updatedFavourites = [...favourites];
    if (!favourites.includes(movie.id)) {
      updatedFavourites.push(movie.id);
    }
    setFavourites(updatedFavourites);
  };

  const removeFromFavourites = (movie) => {
    setFavourites(favourites.filter((mId) => mId !== movie.id));
  };

  const addToWatchlist = (movie) => {
    let updatedWatchlist = [...watchlist];
    if(!watchlist.includes(movie.id)) {
      updatedWatchlist.push(movie.id);
    }
    setWatchlist(updatedWatchlist);
  }

  const removeFromWatchlist = (movie) => {
    setWatchlist(watchlist.filter((mId) => mId !== movie.id));
  }

  const addReview = (movie, review) => { 
    setMyReviews( {...myReviews, [movie.id]: review } )
  };

  return (
    <MoviesContext.Provider
      value={{
        favourites,
        watchlist,
        addToFavourites,
        removeFromFavourites,
        addToWatchlist,
        removeFromWatchlist,
        addReview,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;