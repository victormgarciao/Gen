import React, { Component, createRef } from "react";
import interact from "interactjs";
import BoxDraggable from "../components/BoxDraggable";
import { handleBoxPropsAfterDrag, handleBoxTranslation } from "../utils/boxes/translation-handlers.utils";
import { parentRestriction } from "../utils/interactions/modifiers.utils";
import { updateAxisOfAllBoxes } from "../utils/boxes/position.utils";
import { bindContextToFunctionList } from "../utils/react/react";

function getBoxStyle(props) {
    const { width, height, left, top, color, selected } = props;

    return {
        backgroundColor: color,
        width: selected ? width - 12 : width,
        height: selected ? height - 12 : height,
        margin: selected ? 5 : 0,
        border: selected ? '2px solid black' : 'none',
        transform: `translate(${left}px, ${top}px)`,
        userSelect: 'none'
    };
};

function getClassNames({ selected }) {
    return selected ? 'box selected' : 'box';
}

class BoxDraggableContainer extends Component {
    constructor(props) {
        super(props);
        this.boxRef = createRef();
        this.hasBeenMoved = false;

        this.width = props.width;

        const bindThisToFunctions = bindContextToFunctionList(this);
        bindThisToFunctions([
            'handleDrag',
            'handleToggle',
            'handleDeleteCurrentBox',
        ]);
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
        event.preventDefault();
        event.stopPropagation();
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
                boxStyle={getBoxStyle(this.props)}
                classNameList={getClassNames(this.props)}
                reference={this.boxRef}
                handleToggle={this.handleToggle}
                handleDeleteCurrentBox={this.handleDeleteCurrentBox}
            />
        );
    };
}

export default BoxDraggableContainer;
