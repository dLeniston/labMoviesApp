import React, { useState } from "react";
import { supabaseClient } from "../utils/client";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [favourites, setFavourites] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [myReviews, setMyReviews] = useState( {} )

  const addToFavourites = async (movie) => {
    try{
        let updatedFavourites = [...favourites];
        if(!favourites.includes(movie.id)) {
          // add to supabase DB table "favourites"
          let { error } = await supabaseClient
            .from("favourites").insert({movie_id: movie.id});
          // if no error returned from supabase, add to server state
          if(!error){
            updatedFavourites.push(movie.id);
          }else{
            throw error;
          }
        }
        setFavourites(updatedFavourites);
    } catch (err) {
      console.log(err);
    }
  }

  const removeFromFavourites = async (movie) => {
    try{
      let { error } = await supabaseClient
        .from("favourites").delete().eq("movie_id", movie.id);

      if(!error){
        //remove from server state
        setFavourites(favourites.filter((mId) => mId !== movie.id));
      }else{
        throw error;
      }
    
    }catch(err){
      console.log(err);
    }
  };

  const addToWatchlist = async (movie) => {
    try{
      let updatedWatchlist = [...watchlist];
      if(!watchlist.includes(movie.id)) {
        let { error } = await supabaseClient
        .from("watchlist").insert({movie_id: movie.id});
      
        if(!error){
          updatedWatchlist.push(movie.id)
        }else{
          throw error;
        }
      }
      setWatchlist(updatedWatchlist);
    }catch(err){
      console.log(err);
    }
  }

  const removeFromWatchlist = async (movie) => {
    try{
      let { error } = await supabaseClient
        .from("watchlist").delete().eq("movie_id", movie.id);
      
      if(!error){
        setWatchlist(watchlist.filter((mId) => mId !== movie.id));
      }else{
        throw error;
      }

    }catch(err){
      console.log(err);
    }
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