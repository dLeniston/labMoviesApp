import React, { useState, useEffect } from "react";
import { getUserSelection } from "../api/supabase";
import { useAuth } from "../hooks/useAuth";
import { supabaseClient } from "../utils/client";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const { session }  = useAuth();
  const [favourites, setFavourites] = useState( [] );
  const [watchlist, setWatchlist] = useState( [] );
  const [myReviews, setMyReviews] = useState( {} );

  useEffect(() => {
    getUserFavourites(session?.user?.id);
    getUserWatchlist(session?.user?.id);
  }, [session]);

  const getUserFavourites = async (user) => {
    let userFavourites = await getUserSelection("favourites", user);
    if(userFavourites === undefined){
      setFavourites([]);
    }else{
      setFavourites(userFavourites);
    }
  }

  const getUserWatchlist = async (user) => {
    let userWatchlist = await getUserSelection("watchlist", user);
    if(userWatchlist === undefined){
      setWatchlist([]);
    }else{
      setWatchlist(userWatchlist);
    }
  }

  const addToFavourites = async (movie, user) => {
    try{
        let updatedFavourites = [...favourites];
        if(!favourites.includes(movie.id)) {
          // add to supabase DB table "favourites"
          let { error } = await supabaseClient
            .from("favourites").insert({id: movie.id, user_id: user});
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

  const removeFromFavourites = async (movie, user) => {
    try{
      let { error } = await supabaseClient
        .from("favourites").delete().eq("id", movie.id).eq("user_id", user);

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

  const addToWatchlist = async (movie, user) => {
    try{
      let updatedWatchlist = [...watchlist];
      if(!watchlist.includes(movie.id)) {
        let { error } = await supabaseClient
        .from("watchlist").insert({id: movie.id, user_id: user});
      
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

  const removeFromWatchlist = async (movie, user) => {
    try{
      let { error } = await supabaseClient
        .from("watchlist").delete().eq("id", movie.id).eq("user_id", user);
      
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
        getUserFavourites,
        getUserWatchlist,
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