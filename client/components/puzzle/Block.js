import React from 'react';
import { useEvent, getColors } from "./Util";

const style = {
    height: 120,
    width: 120,
    background: "lightgray",
    margin: 3,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 60,
    fontWeight: "800",
    color: "white",
}

const Block = ({num}) => {
    return (
        <div
            style={{
                ...style,
                background: getColors(num),
                color: num === 2 || num === 4 ? "#645B52" : "#F7F4EF",
            }}
        >
            {num !== 0 ? num : ""}
        </div>
    )
}

export default Block;