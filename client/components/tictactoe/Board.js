import React from 'react'
import Square from './Square'

const style = {
    margin: '10px auto',
    border: '1rem solid #ff652f',
    background: '#ff652f',
    width: '600px',
    height: '600px',
    display: 'grid',
    gridTemplate: 'repeat(3, 1fr) / repeat(3, 1fr)',
    gap: '0.5rem',
    flexWrap: 'wrap'
}

export default function Board({ squares, onClick }) {
    return (
        <div style={style}>
            {squares.map((square, i) => (
                <Square key={i} value={square} onClick={() => onClick(i)} />
            ))}
        </div>
    )
}
