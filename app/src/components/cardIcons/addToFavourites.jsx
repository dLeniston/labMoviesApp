import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useAuth } from "../../hooks/useAuth";

const AddToFavouritesIcon = ({ movie }) => {
  const context = useContext(MoviesContext);
  const { session }  = useAuth();

  const onUserSelect = (e) => {
    e.preventDefault();
    context.addToFavourites(movie, session?.user?.id);
  };
  return (
    <IconButton aria-label="add to favorites" onClick={onUserSelect}>
      <FavoriteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToFavouritesIcon;
