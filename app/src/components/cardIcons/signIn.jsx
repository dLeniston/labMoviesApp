import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/authContext";
import Button from "@mui/material/Button";
import GoogleIcon from '@mui/icons-material/Google';

const SignIn = () => {
  const context = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    await context.signIn();
  }

  return (
    <Button variant="outlined" startIcon={<GoogleIcon />} onClick={handleLogin}>
        Sign in with Google
    </Button>
  );
};

export default SignIn;