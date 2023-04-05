import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import { MoviesContext } from "../../contexts/moviesContext";
import { useAuth } from "../../hooks/useAuth";

const RemoveFromWatchlistIcon = ({ movie }) => {
  const context = useContext(MoviesContext);
  const { session }  = useAuth();

  const onUserRequest = (e) => {
    e.preventDefault();
    context.removeFromWatchlist(movie, session?.user?.id);
  };

return (
  <IconButton
    aria-label="remove from watchlist"
    onClick={onUserRequest}
  >
    <PlaylistRemoveIcon color="primary" fontSize="large" />
  </IconButton>
);
};

export default RemoveFromWatchlistIcon;