import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import Tooltip from '@mui/material/Tooltip';
import { grey } from "@mui/material/colors";
import { useAuth } from "../../hooks/useAuth";
import { addToWatchlist } from "../../api/tmdb-api";

const AddToWatchlistIcon = ({ movie }) => {
  const context = useContext(MoviesContext);
  const { user }  = useAuth();

  const onUserSelect = (e) => {
    e.preventDefault();
    addToWatchlist(movie.id, user?.id);
    //context.addToWatchlist(movie, session?.user?.id);
  };
  return (
    <Tooltip title={`Add "` + movie.title + `" to watchlist`}>
      <IconButton aria-label="add to watchlist" onClick={onUserSelect}>
        <PlaylistAddIcon fontSize="large" sx={{color: grey[300]}} />
      </IconButton>
    </Tooltip>
  );
};

export default AddToWatchlistIcon;