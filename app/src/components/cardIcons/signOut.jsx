import React, { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";
import Button from "@mui/material/Button";
import LogoutIcon from '@mui/icons-material/Logout';

const SignOut = () => {
  const context = useContext(AuthContext);

  const handleLogout = async (e) => {
    e.preventDefault();
    await context.signOut();
  }

  return (
    <Button variant="contained" sx={{fontSize: 24}} startIcon={<LogoutIcon />} onClick={handleLogout}>
        Sign Out
    </Button>
  );
};

export default SignOut;