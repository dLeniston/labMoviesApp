import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import { MoviesContext } from "../../contexts/moviesContext";

const RemoveFromWatchlistIcon = ({ movie }) => {
  const context = useContext(MoviesContext);

  const onUserRequest = (e) => {
    e.preventDefault();
    context.removeFromWatchlist(movie);
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