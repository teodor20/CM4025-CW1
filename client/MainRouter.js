import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './core/Home'
import Signup from './components/user/Signup'
import Signin from './auth/Signin'
import EditProfile from './components/user/EditProfile'
import Profile from './components/user/Profile'
import PrivateRoute from './auth/PrivateRoute'
import Menu from './core/Menu'
import SnakeBoard from './components/snake/Board'
import TicTacToeBoard from './components/tictactoe/Game'
import PuzzleBoard from './components/puzzle/Game'
import DashboardAdmin from './components/user/DashboardAdmin'
import About from './components/About'
import NotFound from './components/NotFound'

const MainRouter = () => {
    return (<div>
        <Menu />
        <Switch>
           <Route exact path="/" component={Home}/>
           <Route path="/signup" component={Signup}/>
           <Route path="/signin" component={Signin}/>
           <PrivateRoute path="/user/edit/:userId" component={EditProfile}/>
           <Route path="/user/:userId" component={Profile}/>
           <PrivateRoute path="/dashboardadmin/:userId" component={DashboardAdmin}/>
           <Route path="/snake" component={SnakeBoard}/>
           <Route path="/tictactoe" component={TicTacToeBoard}/>
           <Route path="/puzzle" component={PuzzleBoard}/>
           <Route path="/about" component={About}/>
           <Route component={NotFound}/>
        </Switch>
    </div>)
}

export default MainRouter