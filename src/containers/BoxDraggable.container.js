import React, { Component, createRef } from "react";
import interact from "interactjs";
import BoxDraggable from "../components/BoxDraggable";
import { handleBoxPropsAfterDrag, handleBoxTranslation, handleBoxBeforeDrag } from "../utils/boxes/position.utils";
import { parentRestriction } from "../utils/interactions/modifiers.utils";

class BoxDraggableContainer extends Component {
    constructor(props) {
        super(props);
        this.boxRef = createRef();
        this.hasBeenMoved = false;

        this.handleDrag = this.handleDrag.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
    }

    handleToggle() {
        if (!this.hasBeenMoved) {
            this.props.toggle();
        }
        this.hasBeenMoved = false;
    }

    handleDrag() {
        this.hasBeenMoved = true;
        handleBoxBeforeDrag()
    }

  
    componentDidMount() {
        const currentBox = this.boxRef.current;

        interact(currentBox)
            .draggable({
                modifiers: parentRestriction,
                listeners: {
                    start: this.handleDrag,
                    move: handleBoxTranslation,
                    end: handleBoxPropsAfterDrag,
                }
            })
        ;
    }
  
    render() {
        return (
            <BoxDraggable
                {...this.props}
                reference={this.boxRef}
                handleToggle={this.handleToggle}
            />
        );
    };
}

export default BoxDraggableContainer;
