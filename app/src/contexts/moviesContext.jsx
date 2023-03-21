import React, { useState } from "react";
import { getUserSelection } from "../api/supabase";
import { supabaseClient } from "../utils/client";

export const MoviesContext = React.createContext(null);

const userFavourites = await getUserSelection("favourites");
const userWatchlist = await getUserSelection("watchlist");

const MoviesContextProvider = (props) => {
  const [favourites, setFavourites] = useState(userFavourites);
  const [watchlist, setWatchlist] = useState(userWatchlist);
  const [myReviews, setMyReviews] = useState( {} )

  const addToFavourites = async (movie) => {
    try{
      console.log("FAVS: ", favourites);
        let updatedFavourites = [...favourites];
        if(!favourites.includes(movie.id)) {
          // add to supabase DB table "favourites"
          let { error } = await supabaseClient
            .from("favourites").insert({id: movie.id});
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
        .from("favourites").delete().eq("id", movie.id);

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
        .from("watchlist").insert({id: movie.id});
      
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
        .from("watchlist").delete().eq("id", movie.id);
      
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