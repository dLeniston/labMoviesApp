import React from "react";
import MoviesHeader from "../components/headerMovieList";
import { MemoryRouter } from "react-router";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import themeStyle from "../theme";
import MoviesContextProvider from "../contexts/moviesContext";

const theme = createTheme(themeStyle);

export default {
  title: "Home Page/MoviePageHeader",
  component: MoviesHeader,
  decorators: [
    (Story) => <ThemeProvider theme={theme}>{Story()}</ThemeProvider>,
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    (Story) => <MoviesContextProvider>{Story()}</MoviesContextProvider>,
  ],
};

export const Basic = () => <MoviesHeader title="Discover Movies" />;

Basic.storyName = "Default";
