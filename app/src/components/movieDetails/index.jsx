import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRateIcon from "@mui/icons-material/StarRate";
import Typography from "@mui/material/Typography";
import MovieReviews from '../movieReviews'
import SwipeableViews from 'react-swipeable-views';

const styles = {
  chipSet: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
  },
  chipLabel: {
    margin: 0.5,
  },
  fab: { 
    position: "fixed",
    top: 50,
    right: 2,
  },
  overview: {
    paddingTop: "20px",
    paddingBottom: "20px"
  },
  slideContainer: {
    height: 300,
  },
  reviews: {
    marginTop: "50px"
  }
};

const MovieDetails = ( {movie}) => {

  return (
    <>
    <Paper>
      <Typography variant="h4" component="h3" sx={styles.overview}>
        {movie.tagline || "Overview"}
      </Typography>
      <div style={{width: "80%", margin: "auto"}}>
        <Typography variant="h6" component="p">
          {movie.overview}
        </Typography>
      </div>

      <Paper component="ul" sx={styles.chipSet}>
        <li>
          <Chip label="Genres" sx={styles.chipLabel} color="primary" />
        </li>
        {movie.genres.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} sx={{marginLeft: "5px"}}  />
          </li>
        ))}
      </Paper>
      <Paper component="ul" sx={styles.chipSet}>
        <Chip color="primary" icon={<AccessTimeIcon />} label={`${movie.runtime} min.`} />
        <Chip
          color="primary"
          icon={<MonetizationIcon />}
          label={`${movie.revenue.toLocaleString()}`}
          sx={{marginLeft: "5px"}}
        />
        <Chip
          color="primary"
          icon={<StarRateIcon />}
          label={`${movie.vote_average} (${movie.vote_count}`}
          sx={{marginLeft: "5px"}}
        />
        <Chip color="primary" label={`Released: ${movie.release_date}`} sx={{marginLeft: "5px"}} />
        <div style={{marginTop: "20px"}}>
          <Typography variant="h4" component="h3" align="left">
            Reviews
          </Typography>
          <SwipeableViews containerStyle={styles.slideContainer}>
            <MovieReviews movie={movie} />
          </SwipeableViews>
        </div>
        </Paper>
      </Paper>
    </>
  );
};
export default  MovieDetails;

