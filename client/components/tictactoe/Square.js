import React from 'react';

const style = {
    background: 'gray',
    /* font-weight: 800; */
    cursor: 'pointer',
    fontSize: "35px"
}

const Square = ({value, onClick}) => {

    return (
        <button style={style} onClick={onClick}>
            <h1>{value}</h1>
        </button>
    )
}

export default Square;