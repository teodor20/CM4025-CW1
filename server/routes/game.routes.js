import express from 'express'
import gameCtrl from '../controllers/game.controller'
import authCtrl from '../controllers/auth.controller'
import userCtrl from '../controllers/user.controller'

const router = express.Router()

router.route('/api/games/:userId')
    .post(authCtrl.requireSignin, authCtrl.hasAuthorization, gameCtrl.create)

router.route('/api/games/admin/:userId')
    .delete(authCtrl.requireSignin, authCtrl.hasAdminAuthorization, gameCtrl.remove)

router.route('/api/games/admin/:userId')
    .get(authCtrl.requireSignin, authCtrl.hasAdminAuthorization, gameCtrl.list)
    

router.param('userId', userCtrl.userByID)
router.param('gameId', gameCtrl.gameByID)

export default router