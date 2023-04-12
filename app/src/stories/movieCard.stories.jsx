import React from "react";
import MovieCard from "../components/movieCard";
import SampleMovie from "./sampleData";
import { MemoryRouter } from "react-router";
import MoviesContextProvider from "../contexts/moviesContext";
import AuthContextProvider from "../contexts/authContext";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import themeStyle from "../theme";

const theme = createTheme(themeStyle);

export default {
  title: "Home Page/MovieCard",
  component: MovieCard,
  decorators: [
    (Story) => <ThemeProvider theme={theme}>{Story()}</ThemeProvider>,
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    (Story) => <AuthContextProvider>{Story()}</AuthContextProvider>,
    (Story) => <MoviesContextProvider>{Story()}</MoviesContextProvider>,
  ],
};

export const Basic = () => {
  return (
    <MovieCard
      movie={SampleMovie}
      action={(movie) => <AddToFavouritesIcon movie={movie} />}
      taging={(movie) => null}
    />
  );
};
Basic.storyName = "Default";

export const Exceptional = () => {
  const sampleNoPoster = { ...SampleMovie, poster_path: undefined };
  return (
    <MovieCard
      movie={sampleNoPoster}
      action={(movie) => <AddToFavouritesIcon movie={movie} />}
      taging={(movie) => null}
    />
  );
};
Exceptional.storyName = "exception";
