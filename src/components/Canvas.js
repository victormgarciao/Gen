import React from "react";

import { observer } from "mobx-react";
import Box from "../components/Box";
import { values } from "mobx";
import SelectionSquare from "./SelectionSqare";

function Canvas(props) {
    const {
        store,
        isSelectionOn,
        handleMouseUp,
        handleMouseDown,
        handleMouseMove,
        selectionWidth,
        selectionHeight,
        selectionLeft,
        selectionTop,
    } = props;

    return (
        <div
            className="canva"
            id="canvas"
            onMouseUp={handleMouseUp}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
        >
            { isSelectionOn && (
                <SelectionSquare
                    width={selectionWidth}
                    height={selectionHeight}
                    left={selectionLeft}
                    top={selectionTop}
                />
            )}
            {values(store.boxes).map((box) => (
                <Box
                    id={box.id}
                    key={box.id}
                    color={box.color}
                    left={box.left}
                    top={box.top}
                    width={box.width}
                    height={box.height}
                    selected={box.selected}
                    box={box}
                    toggle={box.toggle}
                />
            ))}
        </div>
    );
}

export default observer(Canvas);
