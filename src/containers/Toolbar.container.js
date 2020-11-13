import { observer } from "mobx-react";
import React, { Component } from "react";
import Toolbar from "../components/Toolbar";
import store from "../stores/MainStore";
import { updateAxisOfAllBoxes } from "../utils/boxes/position.utils";

class ToolbarContainer extends Component {
    
    async handleRemoveSelectedBoxes() {
        await store.removeSelectedBoxes();
        updateAxisOfAllBoxes();
    }


    async handleUndo() {
        await store.undo();
        updateAxisOfAllBoxes();
    }


    async handleRedo() {
        await store.redo();
        updateAxisOfAllBoxes();
    }


    render() {
        const hasNoBoxes = !store.boxes.length;
        const hasNoSelectedBoxes = !store.getSelectedBoxes().length;
        const isNotUndoable = !store.canUndo();
        const isNotRedoable = !store.canRedo();

        return (
            <Toolbar
                addBoxToStore={store.addBoxToStore}
                removeAllBoxes={store.removeAllBoxes}
                handleRemoveSelectedBoxes={this.handleRemoveSelectedBoxes}
                getSelectedBoxesLabel={store.getSelectedBoxesLabel}
                setColorToSelectedBoxes={store.setColorToSelectedBoxes}
                handleUndo={this.handleUndo}
                handleRedo={this.handleRedo}
                hasNoBoxes={hasNoBoxes}
                hasNoSelectedBoxes={hasNoSelectedBoxes}
                isNotUndoable={isNotUndoable}
                isNotRedoable={isNotRedoable}
            />
        );
    }
}

export default observer(ToolbarContainer);
