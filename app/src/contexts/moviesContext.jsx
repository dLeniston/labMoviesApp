import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { addUserItem, getUserItems, removeFromUserItems } from "../api/tmdb-api";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const { user, isAuthenticated }  = useAuth() || {};
  const [favourites, setFavourites] = useState( [] );
  const [watchlist, setWatchlist] = useState( [] );

  useEffect(() => {
    //Setup favourites and watchlist from user data present in database
    getUserFavourites(user);
    getUserWatchlist(user);
  }, [ user ]);

  useEffect(() => {
    // Clear favorites and watchlist state on sign out
    if (isAuthenticated == false) {
        setFavourites( [] );
        setWatchlist( [] );
    }
}, [isAuthenticated]);

  // Get users favourites from database, populate server state
  const getUserFavourites = async (user) => {
    let userFavourites = await getUserItems(`${import.meta.env.VITE_MOVIES_API}/api/accounts/${user?.id}/favourites`);
    if(userFavourites === undefined){
      setFavourites([]);
    }else{
      setFavourites(userFavourites);
    }
  }

  // Get users watchlist items from database, populate server state
  const getUserWatchlist = async (user) => {
    let userWatchlist = await getUserItems(`${import.meta.env.VITE_MOVIES_API}/api/accounts/${user?.id}/watchlist`);
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
          // add to user account
          let { error } = await addUserItem(`${import.meta.env.VITE_MOVIES_API}/api/accounts/${user?.id}/favourites`, movie.id);
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
  };

  const removeFromFavourites = async (movie, user) => {
    try{
      let { error } = await removeFromUserItems(`${import.meta.env.VITE_MOVIES_API}/api/accounts/${user?.id}/favourites`, movie.id)
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

  const removeFromWatchlist = async (movie, user) => {
    try{
      let { error } = await removeFromUserItems(`${import.meta.env.VITE_MOVIES_API}/api/accounts/${user?.id}/watchlist`, movie.id)
      if(!error){
        //remove from server state
        setWatchlist(watchlist.filter((mId) => mId !== movie.id));
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
        let { error } = await addUserItem(`${import.meta.env.VITE_MOVIES_API}/api/accounts/${user?.id}/watchlist`, movie.id);
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

  return (
    <MoviesContext.Provider
      value={{
        favourites,
        watchlist,
        getUserFavourites,
        getUserWatchlist,
        addToFavourites,
        addToWatchlist,
        removeFromFavourites,
        removeFromWatchlist,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;