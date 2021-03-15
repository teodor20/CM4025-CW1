import React, {useState} from 'react'
import Board from './Board'

const style = {
    fontFamily: '"Roboto", sans-serif',
    justifyContent: 'center',
    display: 'flex',
    minHeight: '100vh',
    infoWrapper: {
        display: 'flex',
        justifyContent: 'space-between'
    }
}

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

const Game = () => {
    const [history, setHistory] = useState([Array(9).fill(null)])
    const [stepNumber, setStepNumber] = useState(0);
    const [xIsNext, setXisnext] = useState(true);
    const winner = calculateWinner(history[stepNumber]);
    const xO = xIsNext ? "X" : "O";

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

    const jumpTo = (step) => {
        setStepNumber(step);
        setXisnext(step % 2 === 0);
    }

    const renderMoves = () => {
        history.map((_step, move) => {
            const destination = move ? `Go to move #${move}` : "Go to Start";
            return (
                <li key={move}>
                    <button onClick={() => jumpTo(move)}>{destination}</button>
                </li>
            );
        });
    }

    return (
        <div style={style}>
            <h1 style={style}>Tic Tac Toe</h1>
            <Board squares={history[stepNumber]} onClick={handleClick} />
            <div className={style.infoWrapper}>
                <div>
                    <h3>History</h3>
                    {renderMoves()}
                </div>
                <h3>{winner ? "Winner: " + winner : "Next Player: " + xO}</h3>
            </div>
        </div>
    )
}

export default Game;