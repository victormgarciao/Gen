import { observer } from "mobx-react";
import React from "react";
import store from "../stores/MainStore";

const {
  addBoxToStore,
  removeAllBoxes,
  removeSelectedBoxes,
  getSelectedBoxesCount,
  setColorToSelectedBoxes,
} = store;

function Toolbar() {
  return (
    <div className="toolbar">
      <button onClick={addBoxToStore}>Add Box</button>
      <button onClick={removeSelectedBoxes} disabled={!store.getSelectedBoxes().length}>Remove selected Box/es</button>
      <button onClick={removeAllBoxes} disabled={!store.boxes.length}>Remove All Boxes</button>
      <button onClick={store.undo} disabled={!store.canUndo()}>Undo</button>
      <button onClick={store.redo} disabled={!store.canRedo()}>Redo</button>
      <input type="color" onChange={setColorToSelectedBoxes} />
      <span>{getSelectedBoxesCount()}</span>
    </div>
  );
}

export default observer(Toolbar);
