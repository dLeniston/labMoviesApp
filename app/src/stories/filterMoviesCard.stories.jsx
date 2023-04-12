import React from "react";
import FilterMoviesCard from "../components/filterMoviesCard";
import { MemoryRouter } from "react-router";
import { action } from "@storybook/addon-actions";
import { QueryClientProvider, QueryClient } from "react-query";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import themeStyle from "../theme";

const theme = createTheme(themeStyle);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false,
    },
  },
});

export default {
  title: "Home Page/FilterMoviesCard",
  component: FilterMoviesCard,
  decorators: [
    (Story) => <ThemeProvider theme={theme}>{Story()}</ThemeProvider>,
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    (Story) => (
      <QueryClientProvider client={queryClient}>{Story()}</QueryClientProvider>
    ),
  ],
};

export const Basic = () => {
  return <FilterMoviesCard onUserInput={action("filter input")} />;
};
Basic.storyName = "Default";
