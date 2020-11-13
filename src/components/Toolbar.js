import React from "react";

function Toolbar(props) {

    const {
      addBoxToStore,
      removeAllBoxes,
      handleRemoveSelectedBoxes,
      getSelectedBoxesLabel,
      setColorToSelectedBoxes,
      handleUndo,
      handleRedo,
      hasNoBoxes,
      hasNoSelectedBoxes,
      isNotUndoable,
      isNotRedoable,
    } = props;


    return (
      <div className="toolbar">
        <button onClick={addBoxToStore}>Add Box</button>
        <button onClick={removeAllBoxes} disabled={hasNoBoxes}>Remove All Boxes</button>
        <button onClick={handleRemoveSelectedBoxes} disabled={hasNoSelectedBoxes}>Remove selected Box/es</button>
        <button onClick={handleUndo} disabled={isNotUndoable}>Undo</button>
        <button onClick={handleRedo} disabled={isNotRedoable}>Redo</button>
        <input type="color" onChange={setColorToSelectedBoxes} disabled={hasNoSelectedBoxes} />
        <span>{getSelectedBoxesLabel()}</span>
      </div>
    );
}

export default Toolbar;
