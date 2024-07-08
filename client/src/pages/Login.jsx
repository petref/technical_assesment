import { useEffect, useState } from 'react';
import { Container, TextField, Button, Box, Typography, Paper } from '@mui/material';
import { styled } from '@mui/system';

import { useAuth } from '../context/withAuth';
import { useNavigate } from "react-router-dom";


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
    const { handleLogin } = useAuth();
    let navigate = useNavigate();

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const { token } = useAuth();

    useEffect(() => {
        console.log(token)
        if(token) navigate("/dashboard")
 
    }, [token])
    
    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin(email, password);
    }
  
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
                            value={email || ""}
                            onChange={({target}) => setEmail(target?.value)}
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
                            value={password || ""}
                            onChange={({target}) => setPassword(target?.value)}
                        />
                        <ButtonStyled
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={(e) => handleSubmit(e)}
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
