import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { emphasize, fade, darken, lighten } from '@material-ui/core/styles/colorManipulator';

import clsx from 'clsx';

import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';

import snakeImg from './../assets/images/snake-game.jpg'
import ticTacToeImg from './../assets/images/tic-tac-toe.png'



const useStyles = makeStyles((theme) => ({
  media: {
    height: '256px'
  },
}
));

export default function Component(props) {
  const classes = useStyles();

  return (
    <section>
      <Box pt={8} pb={10}>
        <Container maxWidth="sm">
          <Box textAlign="center" mb={5}>
            <Typography variant="h4" component="h2" gutterBottom={true}>Pick your game!</Typography>
            <Typography variant="subtitle1" color="textSecondary">Select between your favourite classic games below</Typography>
          </Box>
        </Container>
        <Container maxWidth="lg">
          <Box textAlign="center">
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <Card>
                  <CardActionArea href="/snake">
                    <CardMedia className={classes.media} image={snakeImg} />
                    <CardHeader title="Classic Snake" subheader="The player controls a dot, square, or object on a bordered plane. As it moves forward, it leaves a trail behind, resembling a moving snake." titleTypographyProps={{gutterBottom: true}}/>
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card>
                <CardActionArea href="/tictactoe">
                    <CardMedia className={classes.media} image={ticTacToeImg} />
                    <CardHeader title="Tic-Tac-Toe" subheader="The player controls a dot, square, or object on a bordered plane. As it moves forward, it leaves a trail behind, resembling a moving snake." titleTypographyProps={{gutterBottom: true}} />
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card>
                  <CardActionArea href="#">
                    <CardMedia className={classes.media} image={snakeImg} />
                    <CardHeader title="Tic-Tac-Toe" subheader="The player controls a dot, square, or object on a bordered plane. As it moves forward, it leaves a trail behind, resembling a moving snake." titleTypographyProps={{gutterBottom: true}} />
                  </CardActionArea>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </section>
  );
}