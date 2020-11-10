import { observer } from "mobx-react";
import React from "react";
import store from "../stores/MainStore";


function Toolbar(props) {
    const {
      addBoxToStore,
      removeAllBoxes,
      handleRemoveSelectedBoxes,
      getSelectedBoxesLabel,
      setColorToSelectedBoxes,
    } = props;

    return (
      <div className="toolbar">
        <button onClick={addBoxToStore}>Add Box</button>
        <button onClick={removeAllBoxes} disabled={!store.boxes.length}>Remove All Boxes</button>
        <button onClick={handleRemoveSelectedBoxes} disabled={!store.getSelectedBoxes().length}>Remove selected Box/es</button>
        <button onClick={store.undo} disabled={!store.canUndo()}>Undo</button>
        <button onClick={store.redo} disabled={!store.canRedo()}>Redo</button>
        <input type="color" onChange={setColorToSelectedBoxes} disabled={!store.getSelectedBoxes().length} />
        <span>{getSelectedBoxesLabel()}</span>
      </div>
    );
}

export default observer(Toolbar);
