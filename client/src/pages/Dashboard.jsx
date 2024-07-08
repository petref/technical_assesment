import { AppBar, Toolbar, Typography, Button, Box, Container, Grid, Paper } from '@mui/material';
import { styled } from '@mui/system';
import ChatIcon from '@mui/icons-material/Chat';

const HeroSection = styled(Box)(({ theme }) => ({
    height: '100vh',
    backgroundColor: theme.palette.primary,
    color: theme.palette.secondary,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    textAlign: 'center',
    padding: theme.spacing(4),
  }));
  
  const FeaturesSection = styled(Box)(({ theme }) => ({
    padding: theme.spacing(8, 0),
    backgroundColor: '#f0f2f5',
  }));
  
  const FeatureItem = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    textAlign: 'center',
  }));
  
  const Footer = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2),
    backgroundColor: '#3f51b5',
    color: '#fff',
    textAlign: 'center',
  }));


const Dashboard = () => {
    return (
        <div>
            <HeroSection>
                <Typography variant="h2" component="h1" gutterBottom>
                    Welcome to WebChat
                </Typography>
                <Typography variant="h5" component="p" gutterBottom>
                    Connect with your friends and family instantly.
                </Typography>
                <Button variant="contained" color="secondary" size="large">
                    Get Started
                </Button>
            </HeroSection>
            <FeaturesSection>
                <Container>
                    <Typography variant="h4" component="h2" gutterBottom textAlign="center">
                        Features
                    </Typography>
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={6} md={4}>
                            <FeatureItem elevation={3}>
                                <Typography variant="h6" component="h3">
                                    Instant Messaging
                                </Typography>
                                <Typography variant="body1">
                                    Send and receive messages in real-time.
                                </Typography>
                            </FeatureItem>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <FeatureItem elevation={3}>
                                <Typography variant="h6" component="h3">
                                    Group Chats
                                </Typography>
                                <Typography variant="body1">
                                    Create group chats with your friends.
                                </Typography>
                            </FeatureItem>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <FeatureItem elevation={3}>
                                <Typography variant="h6" component="h3">
                                    Secure Conversations
                                </Typography>
                                <Typography variant="body1">
                                    Your messages are encrypted for privacy.
                                </Typography>
                            </FeatureItem>
                        </Grid>
                    </Grid>
                </Container>
            </FeaturesSection>
            <Footer>
                <Typography variant="body1">
                    &copy; {new Date().getFullYear()} WebChat. All rights reserved.
                </Typography>
            </Footer>
        </div>
    )
}

export default Dashboard;