import { observer } from "mobx-react";
import React, { Component } from "react";
import Canvas from "../components/Canvas";
import store from "../stores/MainStore";
import { updateAxisOfAllBoxes } from "../utils/boxes/position.utils";

class CanvasContainer extends Component {

    componentDidMount() {
        updateAxisOfAllBoxes();
    }
    

    render() {
        return (
            <Canvas 
                store={store}
                isSelectionOn={store.selection.isSelectionOn}
                handleMouseUp={store.selection.onEndSelection}
                handleMouseDown={store.selection.onStartSelection}
                handleMouseMove={store.selection.onMoveSelection}
                selectionWidth={store.selection.width}
                selectionHeight={store.selection.height}
                selectionLeft={store.selection.left}
                selectionTop={store.selection.top}
            />
        )
    }
}

export default observer(CanvasContainer);
