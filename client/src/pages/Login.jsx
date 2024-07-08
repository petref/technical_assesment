// src/Login.js
import React from 'react';
import { Container, TextField, Button, Box, Typography, Paper } from '@mui/material';
import { styled } from '@mui/system';

const Root = styled('div')(({ theme }) => ({
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f2f5',
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    maxWidth: 400,
    width: '100%',
}));

const Title = styled(Typography)(({ theme }) => ({
    marginBottom: theme.spacing(3),
    fontSize: '2rem',
    textAlign: 'center',
    color: '#3f51b5',
}));

const Form = styled('form')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
}));

const TextFieldStyled = styled(TextField)(({ theme }) => ({
    marginBottom: theme.spacing(2),
}));

const ButtonStyled = styled(Button)(({ theme }) => ({
    marginTop: theme.spacing(2),
}));

const Login = () => {

    const handleLogin = async () => {
        const response = await axios.post('https://localhost:8080/login', {
            username: 'user',
            password: 'password'
        });
        setToken(response.data.token);
    };
    return (
        <Root>
            <Container component="main" maxWidth="xs">
                <StyledPaper elevation={3}>
                    <Title>
                        Login
                    </Title>
                    <Form noValidate>
                        <TextFieldStyled
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextFieldStyled
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <ButtonStyled
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            Sign In
                        </ButtonStyled>
                    </Form>
                </StyledPaper>
            </Container>
        </Root>
    );
};

export default Login;
