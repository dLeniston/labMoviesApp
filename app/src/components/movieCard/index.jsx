import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ListIcon from '@mui/icons-material/List';
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import Grid from "@mui/material/Grid";
import img from '../../images/film-poster-placeholder.png'
import Avatar from "@mui/material/Avatar";
import { MoviesContext } from "../../contexts/moviesContext";

const styles = {
  card: { maxWidth: 345 },
  media: { height: 500, zIndex: "auto" },
  icon: { zIndex: 1, position: "absolute" },
  avatar: {
    zIndex: 1, position: "absolute"
  },
  watch_avatar: {
    backgroundColor: "rgb(0, 255, 0)",
  },
};

export default function MovieCard({ movie, action }) {

  
  const { favourites, watchlist } = useContext(MoviesContext);
  const [isHovering, setIsHovering] = useState(false);
  const year = movie.release_date.split("-");
  
  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  if (favourites.find((id) => id === movie.id)) {
    movie.favourite = true;
  } else {
    movie.favourite = false;
  }

  if (watchlist.find((id) => id === movie.id)) {
    movie.watchlist = true;
  } else {
    movie.watchlist = false;
  }

  return (
    <Card sx={styles.card}>
      <CardActionArea component={Link} to={`/movies/${movie.id}`} state={{fav: movie.favourite}}>
        <div>
          {movie.favourite ? (
                <FavoriteIcon fontSize="large" color="error" sx={styles.icon} />
            ) : movie.watchlist ? (
              <ListIcon fontSize="large" color="success" sx={styles.icon} />
              ) : null}
            <CardMedia
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
              sx={styles.media}
              image={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                  : img
              }
            />
            {isHovering && (
              <div>
                <Typography variant="h6" component="p" sx={{color:"white", fontWeight: "bold", zIndex:"3", position: "absolute", top: 20, left: 20 }}>
                  {movie.title}{" "}
                </Typography>
                <Typography variant="h6" component="p" sx={{color:"white", zIndex:"3", position: "absolute", bottom: 10, left: 20 }}>
                  Click to view more...
                </Typography>
              </div>
            )}
        </div>
      </CardActionArea>
      <CardContent>
        <Grid container spacing={{ xs: 12, md: 10 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item >
            <Typography variant="h6" component="p" sx={{fontWeight: "bold"}}>
              {year[0] || "N/A"}
            </Typography>
          </Grid>
          <Grid item >
            <Typography variant="h6" component="p">
              <StarRateIcon fontSize="small" sx={{color: "#F1C40F"}} />
              {"  "}{movie.vote_average}{` (${movie.vote_count.toLocaleString()})`}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
        {action(movie)}
      </CardActions>
    </Card>
  );
}
