import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Pie, Line, Bar } from 'react-chartjs-2';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import DeleteIcon from '@material-ui/icons/Delete';
import {listGames} from '../api/api-game.js'
import Divider from '@material-ui/core/Divider'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import {listadmin} from '../api/api-user.js'
import {Redirect, Link} from 'react-router-dom'
import auth from '../../auth/auth-helper'
import Footer from '../../core/Footer';

const useStyles = makeStyles(theme => ({
  root: theme.mixins.gutters({
    padding: theme.spacing(1),
    margin: theme.spacing(5)
  }),
  title: {
    margin: `${theme.spacing(4)}px 0 ${theme.spacing(2)}px`,
    color: theme.palette.openTitle
  },
  grid: {
    border: '1px solid black'
  }
}))

export default function DashboardAdmin({ match }) { 
  const classes = useStyles();

  const [pieData, setPieData] = useState({
    labels: [
      'Classic Snake',
      'Tic-Tac-Toe',
      '2048'
    ],

    datasets: [{
      backgroundColor: [
        '#FFAEBC',
        '#A0E7E5',
        '#B4F8C8'
      ]
    }],

    options: {
      title:{
        display:true,
        text:'Total Gameplay Seconds:',
        fontSize:20
      }
    }
  })

  const [lineData, setLineData] = useState({
    datasets: [
      {
        label:"Classic Snake",
        data: [5, 4, 1, 0, 0, 5, 2],
        borderColor: '#FFAEBC',
        fill: false
      },
      {
        label:"Tic-Tac-Toe",
        data: [10, 8, 6, 3, 4, 8, 11],
        borderColor: '#A0E7E5',
        fill: false
      },
      {
        label:"2048",
        data: [3, 2, 1, 7, 2, 0, 5],
        borderColor: '#B4F8C8',
        fill: false
      }
    ],

    options: {
      title:{
        display:true,
        text:'Daily Games:',
        fontSize:20
      }
    }
  })

  const [barData, setBarData] = useState({
    labels: ["Game"],
    datasets: [
      {
        label:"Classic Snake",
        backgroundColor: '#FFAEBC',
        barPercentage: 0.9
      },
      {
        label:"Tic-Tac-Toe",
        backgroundColor: '#A0E7E5',
        barPercentage: 0.9
      },
      {
        label:"2048",
        backgroundColor: '#B4F8C8',
        barPercentage: 0.9
      }
    ],
    options: {
      title:{
        display:true,
        text:'Total Games:',
        fontSize:20
      }
    }
  })

  const [uniquePlayers, setUniquePlayers] = useState(0)

  const [redirectToSignin, setRedirectToSignin] = useState(false)

  const jwt = auth.isAuthenticated()

  useEffect(() => {
    const abortController = new AbortController();
    if (!jwt) {
        setRedirectToSignin(true);
        return function cleanup(){
            abortController.abort()
        }
    }
    else {
      populateLastSevenDays();
      populateGameData();
    }
  }, []);
  if (redirectToSignin) {
      return <Redirect to='/signin'/>
  }

  const populateLastSevenDays = () => {
    let date = new Date();
    let dates = [];

    for (let i = 0; i < 7; i++){

      let tempDate = new Date();
      tempDate.setDate(date.getDate()-i);
      let str = pad(tempDate.getDate() + 1) + "/" + pad(tempDate.getMonth() + 1);
      dates.push(str);
    }
    let reverseDates = dates.reverse()
    setLineData({labels: reverseDates});
  }

  const populateGameData = () => {
    listGames(
      {userId: match.params.userId},
      {t: jwt.token}).then((data) => {
        if (data && data.error) {
          console.log(data.error);
        }
        else {
          let snakeGames = 0;
          let tttGames = 0;
          let puzzleGames = 0;

          let snakeHours = 0;
          let tttHours = 0;
          let puzzleHours = 0;

          let gamesHours = [];
          let uniqueUsersIds = [];
          let uniqueUsers = 0;

          data.forEach(game => {
            if (game.type == "CS") {
              snakeGames++;
              snakeHours += game.duration;
            }
            else if (game.type == "TTT") {
              tttGames++;
              tttHours += game.duration;
            }
            else {
              puzzleGames++;
              puzzleHours += game.duration;
            }

            if (!uniqueUsersIds.includes(game.user))
            {
              uniqueUsersIds.push(game.user);
            }
          })

          gamesHours = [snakeHours, tttHours, puzzleHours]
          uniqueUsers = uniqueUsersIds.length;

          //Set unique players
          setUniquePlayers(uniqueUsers);

          setBarData({ datasets: [ {...barData.datasets[0], data: [snakeGames, 0] },
                                   {...barData.datasets[1], data: [tttGames, 0] },
                                   {...barData.datasets[2], data: [puzzleGames, 0] }] });


          //Set pie chart data
          setPieData({datasets: [{
              data: gamesHours
            }]
          })
        }
      })
  }

  function pad(n) {
    return (n < 10) ? ("0" + n) : n;
  }

    return (
      <section>
        <Typography variant="h1" className={classes.title}></Typography>
        <Grid container spacing={2}>
          <Grid className={classes.grid} item xs={12} md={4}>
            <Card>
              <CardHeader title="Unique Players:" style={{ textAlign: 'center' }} className={classes.cardHeader}></CardHeader>
              <CardContent>
                <Box pt={2} pb={1} px={1}>
                  <Typography style={{ textAlign: 'center' }} variant="h3" component="h2" gutterBottom={true}>
                    {uniquePlayers}
                  </Typography>
                  <Typography style={{ textAlign: 'center' }} variant="body1" component="p">
                    The number of uniue accounts who have at least 1 game.
                  </Typography>
                </Box>
              </CardContent>
              <CardActions>
                <Button startIcon={<DeleteIcon />} variant="contained" color="secondary" fullWidth>Purge Gameplay Seconds</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid className={classes.grid} item xs={12} md={4}>
            <Bar data={barData} options={barData.options}></Bar>
          </Grid>
          <Grid className={classes.grid} item xs={12} md={4}>
            <Pie data={pieData} options={pieData.options} />
          </Grid>
          <Container>
            <Line data={lineData} options={lineData.options}></Line>
          </Container>
        </Grid>
        <Footer/>
      </section>
    )
}
