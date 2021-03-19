import { hot } from 'react-hot-loader'
import React from 'react'
import MainRouter from './MainRouter'
import {BrowserRouter} from 'react-router-dom'
import { ThemeProvider } from '@material-ui/styles'
import theme from './theme'
import CssBaseline from "@material-ui/core/CssBaseline";
const App = () => {
    
React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
        jssStyles.parentNode.removeChild(jssStyles)
    }
}, [])

 return (
 <BrowserRouter>
 <ThemeProvider theme={theme}>
 <CssBaseline />
 <MainRouter/>
 </ThemeProvider>
 </BrowserRouter>
)}
export default hot(module)(App)