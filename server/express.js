import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import userRoutes from './routes/user.routes'
import authRoutes from './routes/auth.routes'

//TODO: Delete later
import Template from './../template'

const app = express()
// parse body params and attache them to req.body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compress())

// secure apps by setting various HTTP headers
app.use(helmet())

// enable CORS - Cross Origin Resource Sharing
app.use(cors())

// user our routes
app.use('/', userRoutes)

// use auth routes
app.use('/', authRoutes)

//Auth error handling
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({
            "error": err.name + ": " + err.message
        })
    } else if (err) {
        res.status(400).json({
            "error": err.name + ": " + err.message
        })
        console.log(err)
    }
})

//TODO: Change Template to something else
app.get('/', (req, res) => {
    res.status(200).send(Template())
})

export default app