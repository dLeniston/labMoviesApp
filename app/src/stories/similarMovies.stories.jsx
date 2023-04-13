import React from "react";
import SimilarMovies from "../components/similarMovies";
import AuthContextProvider from "../contexts/authContext";
import MoviesContextProvider from "../contexts/moviesContext";
import { QueryClientProvider, QueryClient } from "react-query";
import SampleMovie from "./sampleData";
import { MemoryRouter } from "react-router";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import themeStyle from "../theme";

const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 360000,
        refetchInterval: 360000, 
        refetchOnWindowFocus: false
      },
    },
  });

const theme = createTheme(themeStyle);

export default {
  title: "Movie Details Page/SimilarMovies",
  component: SimilarMovies,
  decorators: [
    (Story) => <ThemeProvider theme={theme}>{Story()}</ThemeProvider>,
    (Story) => (
        <QueryClientProvider client={queryClient}>
          {Story()}
        </QueryClientProvider>
      ),
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    (Story) => <AuthContextProvider>{Story()}</AuthContextProvider>,
    (Story) => <MoviesContextProvider>{Story()}</MoviesContextProvider>,
  ],
};

export const Basic = () => <SimilarMovies movie={SampleMovie} />;

Basic.storyName = "Default";