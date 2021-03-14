import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import auth from '../auth/auth-helper'
import {Link, withRouter} from 'react-router-dom'
import logo from './../assets/images/logo.png'
import { makeStyles } from '@material-ui/core/styles';

const isActive = (history, path) => {
  if (history.location.pathname == path)
    return {color: '#ff4081'}
  else
    return {color: '#ffffff'}
}

// const useStyles = makeStyles((theme) => ({
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
//   linkBrand: {
//     flexGrow: 1,
//     [theme.breakpoints.down('xs')]: {
//       display: 'none',
//     }
//   },
//   linkBrandSmall: {
//     display: 'none',
//     flexGrow: 1,
//     [theme.breakpoints.down('xs')]: {
//       display: 'inline-block',
//     }
//   },
//   secondaryButton: {
//     marginRight: theme.spacing(2),
//   }
// }));

//const classes = useStyles();

const content = {
  'brand': { image: logo, width: 275 }
};

let brand = <img src={ content.brand.image } alt="" width={ content['brand'].width } />;

const Menu = withRouter(({history}) => (
  <AppBar position="static">
    <Toolbar>
      {/* <Link to="/" variant="h5" color="inherit" underline="none" className={classes.linkBrand}> */}
      <Link to="/" variant="h5" color="inherit" underline="none">
        {brand}
      </Link>
      {
        !auth.isAuthenticated() && (<span>
          <Link to="/signin">
            {/* <Button color="inherit" style={isActive(history, "/signup")} className={classes.secondaryButton}>{content['secondary-action']} </Button> */}
            <Button color="inherit" style={isActive(history, "/signin")} >Sign In </Button>
          </Link>
          <Link to="/signup">
            <Button variant="contained" color="secondary" style={isActive(history, "/signup")}>Sign Up</Button>
          </Link>
        </span>)
      }
      {
        auth.isAuthenticated() && (<span>
          <Link to={"/user/" + auth.isAuthenticated().user._id}>
            <Button style={isActive(history, "/user/" + auth.isAuthenticated().user._id)}>My Profile</Button>
          </Link>
          <Button color="inherit" onClick={() => {
              auth.clearJWT(() => history.push('/'))
            }}>Sign out</Button>
        </span>)
      }
    </Toolbar>
  </AppBar>
))

export default Menu
