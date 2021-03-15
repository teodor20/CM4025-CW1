import React from 'react';

export default (props) => {

    const style = {
        position: 'absolute',
        width: '2%',
        height: '2%',
        backgroundColor: 'red',
        border: '1px solid #fff',
        zIndex: '1',
        left: `${props.dot[0]}%`,
        top: `${props.dot[1]}%`
    }

    return (
        <div style={style}></div>
    )
}