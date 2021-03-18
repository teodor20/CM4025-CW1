import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';


import gamerImg from '../assets/images/gamerstock.png'
import devImg from '../assets/images/devstock.jpg'
import tableImg from '../assets/images/tablestock.png'

const useStyles = makeStyles((theme) => ({
    switchOrder1: {
      [theme.breakpoints.up('md')]: {
        order: 1,
      }
    },
    switchOrder0: {
      [theme.breakpoints.up('md')]: {
        textAlign: 'right',
        order: 0,
      }
    },
    stepContainer: {
      marginBottom: theme.spacing(4)
    },
    media: {
      height: '256px',
    },
  }));


export default function About() {
    const classes = useStyles();

    return (
        <section>
            <Container maxWidth="sm">
                <Box pt={8} textAlign="center">
                <Typography variant="h4" component="h2" gutterBottom={true}>What is Game Mania about?</Typography>
                <Typography variant="subtitle1" color="textSecondary">Game Mania has been created with the sole purpose of getting an A in the first part of the CM4025 module!</Typography>
                </Box>
            </Container>
            <Container maxWidth="md">
                <Box pt={8} pb={10}>
                <Grid container spacing={6} className={classes.stepContainer}>
                    <Grid item xs={12} md={6}>
                    <Card>
                        <CardActionArea href="#">
                        <CardMedia className={classes.media} image={tableImg} />
                        </CardActionArea>
                    </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                    <Box display="flex" height="100%">
                        <Box my="auto">
                        <Typography variant="h2" component="h3">01</Typography>
                        <Typography variant="h4" component="h2" gutterBottom={true}>Learning React</Typography>
                        <Typography variant="body1" color="textSecondary" paragraph={true}>As a solo developer (opposed to the photo on the left), the biggest challenge was learning React from scratch.</Typography>
                        </Box>
                    </Box>
                    </Grid>
                </Grid>
                <Grid container spacing={6} className={classes.stepContainer}>
                    <Grid item xs={12} md={6} className={classes.switchOrder1}>
                    <Card>
                        <CardActionArea href="#">
                        <CardMedia className={classes.media} image={gamerImg} />
                        </CardActionArea>
                    </Card>
                    </Grid>
                    <Grid item xs={12} md={6} className={classes.switchOrder0}>
                    <Box display="flex" height="100%">
                        <Box my="auto">
                        <Typography variant="h2" component="h3">02</Typography>
                        <Typography variant="h4" component="h2" gutterBottom={true}>Playing Games</Typography>
                        <Typography variant="body1" color="textSecondary" paragraph={true}>Gaming has always been a hobby of mine, therefore, I decided to create a project that allows people to enjoy some good and quick games and further improve my React knowledge. Not only because Pam said it's good to get me an A.</Typography>
                        </Box>
                    </Box>
                    </Grid>
                </Grid>
                <Grid container spacing={6}>
                    <Grid item xs={12} md={6}>
                    <Card>
                        <CardActionArea href="#">
                        <CardMedia className={classes.media} image={devImg} />
                        </CardActionArea>
                    </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                    <Box display="flex" height="100%">
                        <Box my="auto">
                        <Typography variant="h2" component="h3">03</Typography>
                        <Typography variant="h4" component="h2" gutterBottom={true}>The Future</Typography>
                        <Typography variant="body1" color="textSecondary" paragraph={true}>I might or might not improve this website by adding more games and making it better in the future, however, the project has given me the ability and confidence to use React for future projects.</Typography>
                        </Box>
                    </Box>
                    </Grid>
                </Grid>
                </Box>
            </Container>
        </section>
    )
}