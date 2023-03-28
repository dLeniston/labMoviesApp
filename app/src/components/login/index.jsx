import React from "react";
import Container from "@mui/material/Container";
import Logo from "../logo";
import SignIn from "../cardIcons/signIn";
import SignOut from "../cardIcons/signOut";

const styles = {
    borderRadius: "25px",
    boxShadow: "5px 10px #D5D8DC",
    margin: "auto",
    fontFamily: "sans-serif"
};

const div = {
    padding: "0px 0px 50px 100px"
}

const button = {
    padding: "0px 0px 50px 350px"
}

export default function Login (props) {

  return (
    <Container style={styles}>
        <Logo />
        <div style={div}><h1>The place to catch up on all your movies and shows!</h1></div>
        <div style={button}><SignIn /></div>
        <div style={button}><SignOut /></div>
    </Container>
  );
}