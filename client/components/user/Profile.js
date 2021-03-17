import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Pie } from 'react-chartjs-2';
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Edit from '@material-ui/icons/Edit'
import Person from '@material-ui/icons/Person'
import Divider from '@material-ui/core/Divider'
import DeleteUser from './DeleteUser'
import auth from '../../auth/auth-helper'
import {read} from '../api/api-user.js'
import {getUserGames} from '../api/api-game.js'
import {Redirect, Link} from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  root: theme.mixins.gutters({
    maxWidth: 600,
    margin: 'auto',
    padding: theme.spacing(3),
    marginTop: theme.spacing(5)
  }),
  title: {
    marginTop: theme.spacing(3),
    color: theme.palette.protectedTitle
  }
}))

export default function Profile({ match }) {
  const classes = useStyles()
  const [user, setUser] = useState({})
  const [redirectToSignin, setRedirectToSignin] = useState(false)
  const jwt = auth.isAuthenticated()
  const [data, setData] = useState({

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: [
        'Classic Snake',
        'Tic-Tac-Toe',
        '2048'
    ]

    
  })

  const populateUserGames = () => {
    getUserGames(
      {userId: match.params.userId},
      {t: jwt.token}).then((data) => {
        if (data && data.error) {
        } else {
          //Count the different types of games
          let snakeGames = 0;
          let tttGames = 0;
          let puzzleGames = 0;

          data.forEach(game => {
            if (game.type == "CS") {snakeGames++}
            else if (game.type == "TTT") {tttGames++}
            else {puzzleGames++}
          })
        
          let dataArray = [snakeGames, tttGames, puzzleGames]

          setData({datasets: [{
              data: dataArray,
              backgroundColor: [
                '#FFAEBC',
                '#A0E7E5',
                '#B4F8C8'
              ]
            }]
          })

        }
      })
  }

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    read({
      userId: match.params.userId
    }, {t: jwt.token}, signal).then((data) => {
      if (data && data.error) {
        setRedirectToSignin(true)
      } else {
        setUser(data);
        populateUserGames();
      }
    })

    return function cleanup(){
      abortController.abort()
    }

  }, [match.params.userId])
  
  if (redirectToSignin) {
    return <Redirect to='/signin'/>
  }

  return (
    <Paper className={classes.root} elevation={4}>
      <Typography variant="h6" className={classes.title}>
        Profile
      </Typography>
      <List dense>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <Person/>
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={user.name} secondary={user.email}/> {
           auth.isAuthenticated().user && auth.isAuthenticated().user._id == user._id &&
            (<ListItemSecondaryAction>
              <Link to={"/user/edit/" + user._id}>
                <IconButton aria-label="Edit" color="primary">
                  <Edit/>
                </IconButton>
              </Link>
              <DeleteUser userId={user._id}/>
            </ListItemSecondaryAction>)
          }
        </ListItem>
        <Divider/>
        <ListItem>
          <ListItemText primary={"Joined: " + (
            new Date(user.created)).toDateString()}/>
        </ListItem>
      </List>
      <Typography variant="h6" className={classes.title}>Games played:</Typography>
      <Pie data={data} id="test" options="area" />
    </Paper>
  )
}