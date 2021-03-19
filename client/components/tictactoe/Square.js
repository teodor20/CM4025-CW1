import React from 'react';

const styles = {
    background: 'gray',
    cursor: 'pointer',
    fontSize: "35px"
}

export default function Square({value, onClick}) {
    return (
        <button style={styles} onClick={onClick}>
            <h1>{value}</h1>
        </button>
    )
}