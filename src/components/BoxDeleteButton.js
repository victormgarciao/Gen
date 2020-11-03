import React from "react";

function CloseDeleteButton({ action }) {
    return (
        <button
            style={{
                position: "absolute",
                right: "-2px",
                top: "-2px",
            }}
            onClick={action}
        >
            x
        </button>
    )
};

export default CloseDeleteButton;