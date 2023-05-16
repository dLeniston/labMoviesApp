import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Tooltip from '@mui/material/Tooltip';
import { grey } from "@mui/material/colors";
import { useAuth } from "../../hooks/useAuth";
import { addToFavorites } from "../../api/tmdb-api";

const AddToFavouritesIcon = ({ movie }) => {
  const context = useContext(MoviesContext);
  const { user }  = useAuth();

  const onUserSelect = (e) => {
    e.preventDefault();
    addToFavorites(movie.id,  user?.id);
    //context.addToFavourites(movie, session?.user?.id);
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
