import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import { MoviesContext } from "../../contexts/moviesContext";
import Tooltip from '@mui/material/Tooltip';
import { grey } from "@mui/material/colors";
import { useAuth } from "../../hooks/useAuth";

const RemoveFromWatchlistIcon = ({ movie }) => {
  const context = useContext(MoviesContext);
  const { session }  = useAuth();

  const onUserRequest = (e) => {
    e.preventDefault();
    context.removeFromWatchlist(movie, session?.user?.id);
  };

return (
  <Tooltip title={`Remove "` + movie.title + `" from watchlist`}>
    <IconButton aria-label="remove from watchlist" onClick={onUserRequest}>
      <PlaylistRemoveIcon fontSize="large" sx={{color: grey[300]}}/>
    </IconButton>
  </Tooltip>
);
};

export default RemoveFromWatchlistIcon;