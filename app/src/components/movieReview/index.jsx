import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import { grey } from "@mui/material/colors";
import NavigationIcon from "@mui/icons-material/Navigation";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Fab from "@mui/material/Fab";
import { openInNewTab } from "../../util";

const styles = {
  heading: {
    display: "flex", 
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "space-evenly", 
    paddingTop: "20px", 
    paddingBottom: "20px",
    backgroundColor: grey[300],
    color: grey[900]
  },
  reviewBody: {
    width: "80%", 
    margin: "auto", 
    paddingTop: "30px"
  },
  nav: {
    display: "flex", 
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "space-evenly",
    marginTop: "30px",
    paddingBottom: "30px"
  }
}

const MovieReview =  ({ review }) => {

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }, []);

  return (
    <>
      <Paper>
        <Paper sx={styles.heading}>
            <Typography variant="h4" component="h3">
              <b>Review By:</b> {review.author}
            </Typography>
          { review.author_details.avatar_path ? (
              <Avatar alt={review.author} src={review.author_details.avatar_path.substring(1)} sx={{ width: 90, height: 90, boxShadow: 3}} />
              ) : (
                <Avatar alt={review.author} sx={{ width: 90, height: 90, boxShadow: 3}}>
                  <PersonIcon fontSize="large"/>
                  </Avatar>
              )
            }
        </Paper>
        <div style={styles.reviewBody}>
        <Typography variant="h6" component="p">
          {review.content} 
        </Typography>
        </div>
        <div style={styles.nav}>
          <Fab color="secondary" variant="extended" onClick={() => navigate(-1)} sx={styles.fab} >
            <ArrowBackIcon />
              Back to Movie Overview
          </Fab>
          <Fab color="secondary" variant="extended" onClick={() => openInNewTab(`${review.url}`)} sx={styles.fab} >
            <NavigationIcon />
              Review Homepage
          </Fab>
        </div>
      </Paper>
    </>
  );
};
export default MovieReview
