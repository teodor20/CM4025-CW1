import React, {useState, useEffect, useRef} from 'react'
import Board from './Board'
import {Redirect, Link} from 'react-router-dom'
import auth from '../../auth/auth-helper'
import {createGame} from '../api/api-game'
import Button from '@material-ui/core/Button';

const styles = {
    fontFamily: '"Roboto", sans-serif',
    justifyContent: 'center',
    display: 'flex',
    minHeight: '100vh',
    infoWrapper: {
        display: 'flex',
        justifyContent: 'centred',
        textAlign: 'center',
        marginLeft: '450px',
        fontSize: "20px"
    }
};

const calculateWinner = (squares) => {

    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]


    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }

    return null;
}

export default function Game() {
    const [redirectToSignin, setRedirectToSignin] = useState(false)
    const jwt = auth.isAuthenticated();
    const timer = useRef(0);
    let intervalId = 0;

    const [history, setHistory] = useState([Array(9).fill(null)])
    const [stepNumber, setStepNumber] = useState(0);
    const [xIsNext, setXisnext] = useState(true);
    const winner = calculateWinner(history[stepNumber]);
    const xO = xIsNext ? "X" : "O";

    const clearGame = () => {
        recordGame();
        setHistory([Array(9).fill(null)])
        setStepNumber(0);
        setXisnext(true);
    }

    useEffect(() => {
        const abortController = new AbortController();
        if (!jwt) {
            setRedirectToSignin(true);
            return function cleanup(){
                abortController.abort()
            }
        }

        //Create a Game in the db if tab/browser is closed
        window.addEventListener("beforeunload", recordGame);

        //Start timer
        intervalId = setInterval(() => {
            timer.current++;
        }, 1000);

        return () => {
            recordGame();
            clearInterval(intervalId);
            window.removeEventListener("beforeunload", recordGame);
        }

    }, []);
    
    if (redirectToSignin) {
        return <Redirect to='/signin'/>
    }

    //Record game start
    const recordGame = () => {

        clearInterval(intervalId);
        
        const game = {
          type: 'TTT',
          user: jwt.user._id,
          duration: timer.current
        }

        createGame( {userId: jwt.user._id},
                    {t: jwt.token},
                    game ).then((data) => {
                      if (data && data.error) {
                        console.log(data.error)
                      }
                    })

        clearInterval(intervalId);
    }

    const handleClick = (i) => {
        const historyPoint = history.slice(0, stepNumber + 1);
        const current = historyPoint[stepNumber];
        const squares = [...current];
        
        if (winner || squares[i]) return;

        squares[i] = xO;
        setHistory([...historyPoint, squares]);
        setStepNumber(historyPoint.length)
        setXisnext(!xIsNext);
    }

    return (
        <section>
            <div
                style={{
                  fontFamily: "sans-serif",
                  flex: 1,
                  fontWeight: "700",
                  fontSize: 60,
                  color: "#776e65",
                  textAlign: "center"
                }}
            > Tic-Tac-Toe
            </div>
            <div
              style={{
                  width: 600,
                  margin: "auto",
                  marginTop: 30
                }}
            >
                <Board squares={history[stepNumber]} onClick={handleClick} />
                <Button color="primary" variant="contained" style={{float: 'left'}} onClick={clearGame}>New Game</Button>
                <div style={styles.infoWrapper}>
                    <h3>{winner ? "Winner: " + winner : "Next Player: " + xO}</h3>
                </div>
            </div>
        </section>
       
    )
}