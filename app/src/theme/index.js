import { red, yellow, green, blue, deepPurple, lightBlue, grey } from "@mui/material/colors";

const themeStyle = {
  palette: {
    mode: 'light',
    primary: {
      main: grey[900]
    },
    secondary: {
      light: red[500],
      main: deepPurple[500],
      dark: blue[500],
      contrastText: grey[50]
    },
    error: {
      light: red[400],
      main: red[500],
      dark: red[300],
      contrastText: grey[800]
    },
    success: {
      main: green[500]
    },
    warning: {
      main: yellow[500],
      contrastText: grey[800]
    },
    info: {
      main: lightBlue[500]
    },
    text: {
      primary: grey[300],
      secondary: grey[700],
      disabled: grey[500]
    },
    action: {
      active: lightBlue[400],
      activeOpacity: 1,
      disabled: grey[700],
      disabledBackground: grey[200],
      hover: blue[800],
      hoverOpacity: 0.7,
      focus: blue[600],
      focusOpacity: 1,
      selected: lightBlue[300],
      selectedOpacity: 1
    },
    background: {
      default: grey[900],
      paper: grey[800]
    },
    body: {
      default: grey[300]
    },
    common: {
      black: grey[900],
      white: grey[200]
    },
    tonalOffset: 0.2
  },
  typography: {
    fontFamily: ["Lato"],
    fontSize: 16,
    fontWeightRegular: 400,
    fontWeightBold: 700,
    lineHeight: 1.5,
    h1: {
      fontFamily: "Lato",
      color: grey[100],
      fontSize: "6rem",
      fontWeight: 400,
      lineHeight: 1.167,
      lettingSpacing: "-0.01562em"
    },
    h6: {
      fontFamily: "Lato",
    },
    body1: {
      color: grey[100],
      fontFamily: "Lato",
      fontSize: "1.2rem",
      fontWeight: 500
    }
  },
  components: {
    MuiButton: {
      defaultProps: {
        size: "small",
        disableElevation: true,
        variant: "contained",
        style: {
          textAlign: "left"
        },
        sx: {
          borderRadius: 2,
          p: 2
        }
      }
    },
    MuiPagination: {
      defaultProps: {
        size: "large",
        sx: {
          p: 3,
          display: "flex",
          justifyContent:"center",
        }
      }
    },
    MuiMenuItem: {
      defaultProps: {
        sx: {
          p: 3
        }
      }
    },
    MuiTypography: {
      defaultProps: {
        style: {
          textAlign: "center"
        }
      }
    }
  }
};

export default themeStyle;