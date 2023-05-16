import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Avatar } from '@mui/material';
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useAuth } from "../../hooks/useAuth";

const styles = {
  title: {
    flexGrow: 1,
    display: "inline-block"
  },
  avatar: {
    flexGrow: 1,
  },
};

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const SiteHeader = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const { isAuthenticated, user }  = useAuth();

  console.log("USER: ", user);

  const limitedOptions = [
    { label: "Discover", path: "/" },
    { label: "Upcoming", path: "/movies/upcoming" },
    { label: "Sign In", path: "/login"}
  ];

  const fullOptions = [ 
    { label: "Discover", path: "/" },
    { label: "Upcoming", path: "/movies/upcoming" },
    { label: "Favorites", path: "/movies/favourites" },
    { label: "Watchlist", path: "/movies/watchlist" },
    { label: "Sign Out", path: "/logout"}
  ]

  const handleMenuSelect = (pageURL) => {
    navigate(pageURL);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <AppBar sx={styles.appbar} position="fixed" elevation={0} color="primary">
        <Toolbar>
          {!isAuthenticated ? (
            <div style={styles.title}>
              <Typography sx={{fontFamily: "Fugaz One", display: "inline-block", fontSize: "35px"}}>
                SCREENWATCHERS
              </Typography>
            </div>
            ):(
            <div style={styles.title}>
              <Avatar sx={{display: "inline-block", marginRight: "20px"}} alt={user?.firstName ?? null } src={user?.profileImg ?? null} />
              <Typography variant="h6" sx={{display: "inline-block"}}>{user?.firstName} {user?.lastName}</Typography>
            </div>) 
            }
          {isMobile ? (
            <>
              <IconButton
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                size="large">
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={() => setAnchorEl(null)}>
              {!isAuthenticated ? (
                limitedOptions.map((opt) => (
                  <MenuItem
                    key={opt.label}
                    onClick={() => handleMenuSelect(opt.path)}>
                    {opt.label}
                  </MenuItem>
                ))
                ):(
                  fullOptions.map((opt) => (
                    <MenuItem
                      key={opt.label}
                      onClick={() => handleMenuSelect(opt.path)}>
                      {opt.label}
                    </MenuItem>
                  )))}
              </Menu>
            </>
          ) : (
            <>
              {!isAuthenticated ? (
                limitedOptions.map((opt) => (
                  <MenuItem
                    key={opt.label}
                    onClick={() => handleMenuSelect(opt.path)}>
                    {opt.label}
                  </MenuItem>
                ))
                ):(
                  fullOptions.map((opt) => (
                    <MenuItem
                      key={opt.label}
                      onClick={() => handleMenuSelect(opt.path)}>
                      {opt.label}
                    </MenuItem>
                )))}
            </>
          )}
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  );
};

export default SiteHeader;
