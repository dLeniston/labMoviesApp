import React, { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";
import Button from "@mui/material/Button";
import GoogleIcon from '@mui/icons-material/Google';

const SignIn = () => {
  const authContext = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    authContext.signIn();
  }

  return (
    <Button variant="contained" sx={{fontSize: 24}} startIcon={<GoogleIcon />} onClick={handleLogin}>
        Sign in with Google
    </Button>
  );
};

export default SignIn;