import React from "react";
import Header from "../headerMovieList";
import Grid from "@mui/material/Grid";
import MovieList from "../movieList";
import { grey } from "@mui/material/colors";

const styles = {
  root: { 
    backgroundColor: grey[400],
    width: "100vw",
    paddingBottom: "50px",
    paddingTop: "20px"
  }
};

function MovieListPageTemplate({ movies, title, action }) {
  return (
      <Grid container sx={styles.root}>
        <Grid item xs={12} sx={{paddingBottom: "30px" }}>
          <Header title={title} />
        </Grid>
        <Grid item container alignItems="center" justifyContent="center" spacing={{ xs: 12, md: 20 }} columns={{ xs: 4, sm: 8, md: 15 }}>
          <MovieList action={action} movies={movies} />
        </Grid>
      </Grid>
  );
}
export default MovieListPageTemplate;
