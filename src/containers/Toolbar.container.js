import React, { Component } from "react";
import Toolbar from "../components/Toolbar";
import store from "../stores/MainStore";
import { updateAxisOfAllBoxes } from "../utils/boxes/position.utils";
import { bindContextToFunctionList } from "../utils/react/react";

class ToolbarContainer extends Component {
    constructor() {
        super();

        const bindThisToFunctions = bindContextToFunctionList(this);
        bindThisToFunctions([ 'handleRemoveSelectedBoxes' ]);
    }


    async handleRemoveSelectedBoxes() {
        await store.removeSelectedBoxes();
        updateAxisOfAllBoxes();
    }


    render() {
        return (
          <Toolbar
              addBoxToStore={store.addBoxToStore}
              removeAllBoxes={store.removeAllBoxes}
              handleRemoveSelectedBoxes={this.handleRemoveSelectedBoxes}
              getSelectedBoxesLabel={store.getSelectedBoxesLabel}
              setColorToSelectedBoxes={store.setColorToSelectedBoxes}
          />
        );
    }
}

export default ToolbarContainer;
