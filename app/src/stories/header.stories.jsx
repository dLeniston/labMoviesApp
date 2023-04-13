import React from "react";
import SiteHeader from "../components/siteHeader";
import AuthContextProvider from "../contexts/authContext";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import themeStyle from "../theme";
import { MemoryRouter } from "react-router";

const theme = createTheme(themeStyle);

export default {
  title: "App Header",
  component: SiteHeader,
  decorators: [
    (Story) => <ThemeProvider theme={theme}>{Story()}</ThemeProvider>,
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    (Story) => <AuthContextProvider>{Story()}</AuthContextProvider>,
  ],
};

export const Basic = () => <SiteHeader />;

Basic.storyName = "Default";