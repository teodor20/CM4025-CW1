import Game from '../models/game.model'
import errorHandler from './../helpers/dbErrorHandler'

//Create new game
const create = async (req, res) => {
    const game = new Game(req.body)
    try {
        await game.save()
        return res.status(200).json({
            message: "Successfully created a game!"
        })
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

//List all games
const list = async (req, res) => {
    try {
        let games = await Game.find().select('type duration updated created user')
        res.json(games)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

//List all games for user
const userList = async (req, res) => {
    try {
        let games = await Game.find({user: req.profile.id})
        res.json(games)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

//Find game
const gameByID = async (req, res, next, id) => {
    try {
        let game = await Game.findById(id)
        if (!game)
            return res.status('400').json({
                error: "Game not found"
            })
        req.profile = game
        next()
    } catch (err) {
        return res.status('400').json({
            error: "Could not retrieve game"
        })
    }
}

//Remove game
const remove = async (req, res) => {
    try {
        let game = await Game.findById(req.body.id)
        let deletedGame = await game.remove()
        res.json(deletedGame)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

export default {
    create,
    list,
    gameByID,
    userList,
    remove
}