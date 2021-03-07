import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import userRoutes from './routes/user.routes'
import authRoutes from './routes/auth.routes'
// modules for server side rendering
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import MainRouter from './../client/MainRouter'
import { StaticRouter } from 'react-router-dom'
import { ServerStyleSheets, ThemeProvider } from '@material-ui/styles'
import theme from './../client/theme'


//TODO: Delete later
import Template from './../template'

//TODO: comment out before building for production
import devBundle from './devBundle'

const CURRENT_WORKING_DIR = process.cwd()
const app = express()

//TODO: comment out before building for production
devBundle.compile(app)

app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))

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
app.get('*', (req, res) => {
    const sheets = new ServerStyleSheets()
    const context = {}
    const markup = ReactDOMServer.renderToString(
        sheets.collect( <StaticRouter location={req.url} context={context}>
            <ThemeProvider theme={theme}>
            <MainRouter />
            </ThemeProvider>
            </StaticRouter>
        )
        )
    if (context.url) {
        return res.redirect(303, context.url)
    }
    const css = sheets.toString()
    res.status(200).send(Template({
        markup: markup,
        css: css
    }))
   })

export default app