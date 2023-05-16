import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from '../contexts/authContext';
import { Link } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LoginIcon from '@mui/icons-material/Login';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { grey } from "@mui/material/colors";


const LoginPage = (props) => {
  const context = useContext(AuthContext)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const handleSubmit = (e) => {
    e.preventDefault();
    context.authenticate(email, password);
}

  if (context.isAuthenticated === true) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
        <Container component="main" maxWidth="xs" sx={{backgroundColor:grey[300], borderRadius: "10px"}}>
            <CssBaseline />
            <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}
            >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LoginIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{color: grey[900]}}>
                Sign In
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                    sx={{ input: { color: grey[900] } }}
                    InputLabelProps={{style: { color: grey[900]}}}
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={e => {setEmail(e.target.value);}}
                    autoFocus
                />
                <TextField
                    sx={{ input: { color: grey[900] } }}
                    InputLabelProps={{style: { color: grey[900]}}}
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={e => {setPassword(e.target.value);}}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                Sign In
                </Button>
                <Typography component="h4" variant="h5" sx={{color: grey[900], paddingTop: "20px", paddingBottom: "20px"}}>
                    Not registered? <Link to="/register">Sign up here</Link>
                </Typography>
            </Box>
            </Box>
        </Container>
        </>
  );
};

export default LoginPage;
