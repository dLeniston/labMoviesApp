import React, { useContext, useState } from "react";
import { Navigate  } from "react-router-dom";
import { AuthContext } from '../contexts/authContext';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { grey } from "@mui/material/colors";

const SignUpPage = (props) => {
    const context = useContext(AuthContext)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("");
    const [registered, setRegistered] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [profileImg, setProfileImg] = useState("");

    const register = () => {
        if (password.length > 0 && password === passwordAgain) {
        context.register(email, password, firstName, lastName, profileImg);
        setRegistered(true);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password.length > 0 && password === passwordAgain) {
            context.register(email, password, firstName, lastName, profileImg);
            setRegistered(true);
        }
    }

    if (registered === true) {
        return <Navigate to="/" />;
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
            <Avatar sx={{ m: 1, bgcolor: grey[900] }}>
                <AppRegistrationIcon sx={{color: grey[300]}} />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{color: grey[900]}}>
                Register
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
                    sx={{ input: { color: grey[900] } }}
                    InputLabelProps={{style: { color: grey[900]}}}
                    margin="normal"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    name="text"
                    onChange={e => {setFirstName(e.target.value);}}
                    autoFocus
                />
                <TextField
                    sx={{ input: { color: grey[900] } }}
                    InputLabelProps={{style: { color: grey[900]}}}
                    margin="normal"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="text"
                    onChange={e => {setLastName(e.target.value);}}
                    autoFocus
                />
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
                <TextField
                    sx={{ input: { color: grey[900] } }}
                    InputLabelProps={{style: { color: grey[900]}}}
                    margin="normal"
                    required
                    fullWidth
                    name="passwordAgain"
                    label="Confirm Password"
                    type="password"
                    id="passwordAgain"
                    autoComplete="current-password"
                    onChange={e => {setPasswordAgain(e.target.value);}}

                />
                <TextField
                    sx={{ input: { color: grey[900] } }}
                    InputLabelProps={{style: { color: grey[900]}}}
                    margin="normal"
                    fullWidth
                    name="profileImg"
                    label="Profile Image URL"
                    type="text"
                    id="profileImg"
                    onChange={e => {setProfileImg(e.target.value);}}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                Register
                </Button>
            </Box>
            </Box>
        </Container>
        </>
    );
};

export default SignUpPage;