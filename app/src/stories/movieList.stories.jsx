import React from "react";
import MovieList from "../components/movieList";
import SampleMovie from "./sampleData";
import { MemoryRouter } from "react-router";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import Grid from "@mui/material/Grid";
import MoviesContextProvider from "../contexts/moviesContext";
import AuthContextProvider from "../contexts/authContext";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import themeStyle from "../theme";

const theme = createTheme(themeStyle);

export default {
  title: "Home Page/MovieList",
  component: MovieList,
  decorators: [
    (Story) => <ThemeProvider theme={theme}>{Story()}</ThemeProvider>,
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    (Story) => <AuthContextProvider>{Story()}</AuthContextProvider>,
    (Story) => <MoviesContextProvider>{Story()}</MoviesContextProvider>
  ],
};

export const Basic = () => {
  const movies = [
    { ...SampleMovie, id: 1 },
    { ...SampleMovie, id: 2 },
    { ...SampleMovie, id: 3 },
    { ...SampleMovie, id: 4 },
    { ...SampleMovie, id: 5 },
  ];
  return (
    <Grid container spacing={5}>
      <MovieList
        movies={movies}
        action={(movie) => <AddToFavouritesIcon movie={movie} />}
      />
    </Grid>
  );
};
Basic.storyName = "Default";
