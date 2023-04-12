import React from "react";
import { useLocation } from 'react-router-dom'
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import Avatar from "@mui/material/Avatar";
import CardHeader from "@mui/material/CardHeader";

const styles = {
  root: {  
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
    padding: 1.5,
    paddingTop: "30px"
  },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },
};

const MovieHeader = (props) => {
  const movie = props.movie;
  const location = useLocation()
  const {fav} = location.state

  return (
    <Paper component="div" sx={styles.root}>
      <Typography variant="h4" component="h4" sx={{fontWeight: "bold"}}>
        {movie.title}{"   "}
      </Typography>
    </Paper>
  );
};

export default MovieHeader;
