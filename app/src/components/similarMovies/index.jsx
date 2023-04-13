import React, { useState } from "react";
import { fetchResource } from "../../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from '../spinner';
import SwipeableViews from 'react-swipeable-views';
import Movie from "../movieCard";
import { Typography } from "@mui/material";

const styles = {
  root: {
    marginLeft: "50px"
  }
};

const SimilarMovies = ({ movie }) => {

  const { index } = useState(0)

  const { data , error, isLoading, isError } = useQuery(
    ["images", { url: `https://api.themoviedb.org/3/movie/${movie.id}/recommendations?api_key=${import.meta.env.VITE_TMDB_KEY}`}], 
    fetchResource
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  console.log(data.results)

  return (
    <>
          <div>
            <Typography variant="h4" component="h3" sx={{paddingTop: "20px", paddingBottom: "10px", fontWeight: "bold"}}>
                Similar Movies
            </Typography>
            {data.results.length ? (
            <SwipeableViews style={styles.root} enableMouseEvents> 
                {data.results.map((mov) => (
                    <Movie key={mov.id} movie={mov} action={() => {}} />
                ))}
            </SwipeableViews>
              ):( 
                <Typography variant="h4" component="h3" sx={{paddingTop: "20px", paddingBottom: "10px"}}>
                  None Available
                </Typography>
                )
              }
          </div>
    </>
  );
};

export default SimilarMovies