import React from "react";

function SelectionSquare(props) {
    const {
        width,
        height,
        left,
        top,
    } = props;

    return (
        <div
            className="selection"
            style={{
                border: "1px dashed black",
                position: "absolute",
                width,
                height,
                left,
                top
            }}
        >
        </div>
    );
};

export default SelectionSquare;