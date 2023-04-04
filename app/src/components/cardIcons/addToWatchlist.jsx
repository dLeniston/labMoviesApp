import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd'
import { useAuth } from "../../hooks/useAuth";

const AddToWatchlistIcon = ({ movie }) => {
  const context = useContext(MoviesContext);
  const { session }  = useAuth();

  const onUserSelect = (e) => {
    e.preventDefault();
    context.addToWatchlist(movie, session?.user?.id);
  };
  return (
    <IconButton aria-label="add to watchlist" onClick={onUserSelect}>
      <PlaylistAddIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToWatchlistIcon;