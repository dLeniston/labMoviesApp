import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRateIcon from "@mui/icons-material/StarRate";
import Typography from "@mui/material/Typography";
import MovieReviews from '../movieReviews'
import SwipeableViews from 'react-swipeable-views';
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import { openInNewTab } from "../../util";
import { VideoPlayer } from "../videoPlayer"; //CORS issue lead to move away from custom video player to embedded youtube with React Player
import ReactPlayer from "react-player"
import { fetchResource } from '../../api/tmdb-api'
import Spinner from '../../components/spinner'
import { useQuery } from "react-query";

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
    top: 90,
    right: 20,
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

const MovieDetails = ( { movie } ) => {

  const { data: media, error, isLoading, isError } = useQuery(
    ["movie", { url: `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${import.meta.env.VITE_TMDB_KEY}` }],
    fetchResource
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

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
        <div style={{paddingTop: "50px", paddingBottom: "30px", width: "90%" }}>
          <Typography variant="h4" component="h3" sx={{paddingBottom: "10px", fontWeight: "bold"}}>
            Media
          </Typography>
          <SwipeableViews enableMouseEvents>
            {media.results.map((video) => (
                      <ReactPlayer url={`http://www.youtube.com/watch?v=${video.key}`} 
                        style={{margin: "auto", overflow: "hidden"}} controls="true"
                      />
            ))}
          </SwipeableViews>
        </div>
        <div style={{marginTop: "30px", width: "95%"}}>
          <Typography variant="h4" component="h3" sx={{paddingBottom: "10px", fontWeight: "bold"}}>
            Reviews
          </Typography>
          <SwipeableViews containerStyle={styles.slideContainer}>
            <MovieReviews movie={movie} />
          </SwipeableViews>
        </div>
        </Paper>
      </Paper>
      <Fab color="secondary" variant="extended" onClick={() => openInNewTab(`${movie.homepage}`)} sx={styles.fab} >
        <NavigationIcon />
          Movie Homepage
      </Fab>
    </>
  );
};
export default  MovieDetails;

