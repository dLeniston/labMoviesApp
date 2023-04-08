import React from "react";
import Header from "../headerMovieList";
import Grid from "@mui/material/Grid";
import MovieList from "../movieList";

const styles = {
  root: { 
    backgroundColor: "#bfbfbf",
    paddingBottom: "20px"
  }
};

function MovieListPageTemplate({ movies, title, action }) {
  return (
      <Grid container sx={styles.root}>
        <Grid item xs={12} >
          <Header title={title} />
        </Grid>
        <Grid item container spacing={{ xs: 12, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <MovieList action={action} movies={movies} />
        </Grid>
      </Grid>
  );
}
export default MovieListPageTemplate;
