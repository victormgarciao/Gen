import React, { Component } from "react";
import Toolbar from "../components/Toolbar";
import store from "../stores/MainStore";
import { updateAxisOfAllBoxes } from "../utils/boxes/position.utils";

class ToolbarContainer extends Component {
    constructor() {
        super();
        const {
          addBoxToStore,
          removeAllBoxes,
          removeSelectedBoxes,
          getSelectedBoxesLabel,
          setColorToSelectedBoxes,
        } = store;

        this.addBoxToStore = addBoxToStore;
        this.removeAllBoxes = removeAllBoxes;
        this.removeSelectedBoxes = removeSelectedBoxes;
        this.getSelectedBoxesLabel = getSelectedBoxesLabel;
        this.setColorToSelectedBoxes = setColorToSelectedBoxes;

        this.handleRemoveSelectedBoxes = this.handleRemoveSelectedBoxes.bind(this);
    }


    async handleRemoveSelectedBoxes() {
        await this.removeSelectedBoxes();
        updateAxisOfAllBoxes();
    }


    render() {
        return (
          <Toolbar
              addBoxToStore={this.addBoxToStore}
              removeAllBoxes={this.removeAllBoxes}
              handleRemoveSelectedBoxes={this.handleRemoveSelectedBoxes}
              getSelectedBoxesLabel={this.getSelectedBoxesLabel}
              setColorToSelectedBoxes={this.setColorToSelectedBoxes}
          />
        );
    }
}

export default ToolbarContainer;
