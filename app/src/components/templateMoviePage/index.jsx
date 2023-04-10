import React, { useState } from "react";
import MovieHeader from "../headerMovie";
import Grid from "@mui/material/Grid";
import { fetchResource } from "../../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from '../spinner';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const styles = {
  gridListRoot: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  gridList: {
    width: 450,
    height: '100vh',
  },
  slide: {
    padding: 50,
    minHeight: 100,
    color: '#fff',
  },
  img: {
    maxWidth: "100%",
    maxHeight: "100%"
  }
};

const TemplateMoviePage = ({ movie, children }) => {

  const { index } = useState(0)

  const handleChangeIndex = index => {
    setState({index,});
  };

  const { data , error, isLoading, isError } = useQuery(
    ["images", { url: `https://api.themoviedb.org/3/movie/${movie.id}/images?api_key=${import.meta.env.VITE_TMDB_KEY}`}], 
    fetchResource
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  const images = data.posters 

  return (
    <>
        <MovieHeader movie={movie} />
      <Grid container spacing={5} style={{ padding: "30px" }}>
        <Grid item xs={3}>
          <div sx={styles.gridListRoot}>
            <AutoPlaySwipeableViews index={index} onChangeIndex={handleChangeIndex}>
                {images.map((image) => (
                    <img key={image.file_path}
                      style={styles.img}
                      src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                      alt={image.poster_path}
                    />
                ))}
              </AutoPlaySwipeableViews>
          </div>
        </Grid>

        <Grid item xs={9}>
          {children}
        </Grid>
      </Grid>
    </>
  );
};

export default TemplateMoviePage;
