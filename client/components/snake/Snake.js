import React from 'react';

export default (props) => {
    return (
        <div>
            {props.snakeDots.map((dot, i) => {
                const style = {
                    position: 'absolute',
                    width: '2%',
                    height: '2%',
                    backgroundColor: '#000',
                    border: '1px solid #fff',
                    zIndex: '2',
                    left: `${dot[0]}%`,
                    top: `${dot[1]}%`
                }
                return (
                    <div key={i} style={style}></div>
                )
            })}
        </div>
    )
}