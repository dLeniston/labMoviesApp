import React from "react";
import Paper from "@mui/material/Paper";
import { grey } from "@mui/material/colors";
import Typography from "@mui/material/Typography";

const styles = {
  root: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: 1.5,
    p: 2,
    color: grey[900],
    boxShadow: "none",
    backgroundColor: grey[400]
  },
};

const Header = (props) => {
  const title = props.title

  return (
    <Paper component="div" sx={styles.root}>
      <Typography variant="h3" component="h3" sx={{fontWeight: "bold"}}>
        {title}
      </Typography>
    </Paper>
  );
};

export default Header;
