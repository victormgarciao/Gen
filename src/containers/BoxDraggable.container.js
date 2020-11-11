import React, { Component, createRef } from "react";
import interact from "interactjs";
import BoxDraggable from "../components/BoxDraggable";
import { handleBoxPropsAfterDrag, handleBoxTranslation } from "../utils/boxes/translation-handlers.utils";
import { parentRestriction } from "../utils/interactions/modifiers.utils";
import { updateAxisOfAllBoxes } from "../utils/boxes/position.utils";
import { bindContextToFunctionList } from "../utils/react/react";

class BoxDraggableContainer extends Component {
    constructor(props) {
        super(props);
        this.boxRef = createRef();
        this.hasBeenMoved = false;

        const bindThisToFunctions = bindContextToFunctionList(this);
        bindThisToFunctions([ 'handleDrag', 'handleToggle', 'handleDeleteCurrentBox' ]);
    }

    handleToggle() {
        if (!this.hasBeenMoved) {
            this.props.toggle();
        }
        this.hasBeenMoved = false;
    }

    handleDrag() {
        this.hasBeenMoved = true;
    }


    async handleDeleteCurrentBox(event) {
        const { props: { box: { remove } } } = this;
        await remove(event);
        updateAxisOfAllBoxes();
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
                handleDeleteCurrentBox={this.handleDeleteCurrentBox}
            />
        );
    };
}

export default BoxDraggableContainer;
