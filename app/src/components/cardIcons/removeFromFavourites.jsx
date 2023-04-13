import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { MoviesContext } from "../../contexts/moviesContext";
import Tooltip from '@mui/material/Tooltip';
import { grey } from "@mui/material/colors";
import { useAuth } from "../../hooks/useAuth";

const RemoveFromFavouritesIcon = ({ movie }) => {
  const context = useContext(MoviesContext);
  const { session }  = useAuth();

  const onUserRequest = (e) => {
    e.preventDefault();
    context.removeFromFavourites(movie, session?.user?.id);
  };

return (
  <Tooltip title={`Remove "` + movie.title + `" from favourites`}>
    <IconButton aria-label="remove from favorites"onClick={onUserRequest}>
      <DeleteIcon fontSize="large" sx={{color: grey[300]}}/>
    </IconButton>
  </Tooltip>
);
};

export default RemoveFromFavouritesIcon;