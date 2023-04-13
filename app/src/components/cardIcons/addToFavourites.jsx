import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Tooltip from '@mui/material/Tooltip';
import { grey } from "@mui/material/colors";
import { useAuth } from "../../hooks/useAuth";

const AddToFavouritesIcon = ({ movie }) => {
  const context = useContext(MoviesContext);
  const { session }  = useAuth();

  const onUserSelect = (e) => {
    e.preventDefault();
    context.addToFavourites(movie, session?.user?.id);
  };
  return (
    <Tooltip title={`Add "` + movie.title + `" to favourites`}>
      <IconButton aria-label="add to favorites" onClick={onUserSelect}>
        <FavoriteIcon fontSize="large" sx={{color: grey[300]}}/>
      </IconButton>
    </Tooltip>
  );
};

export default AddToFavouritesIcon;
