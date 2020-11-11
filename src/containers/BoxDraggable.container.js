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

        const { width, height, left, top, color } = props;

        this.state = {
            boxStyle: {
                backgroundColor: color,
                width,
                height,
                margin: 0,
                border: 'none',
                transform: `translate(${left}px, ${top}px)`,
                userSelect: 'none'
            }
        }

        this.width = props.width;

        const bindThisToFunctions = bindContextToFunctionList(this);
        bindThisToFunctions([
            'handleDrag',
            'handleToggle',
            'handleDeleteCurrentBox',
            'handleSize',
            'handleColor',
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
        const { props: { box: { remove } } } = this;
        await remove(event);
        updateAxisOfAllBoxes();
    }

    handleSize() {
        const { selected, width, height} = this.props;
        const boxStyleState = {
            boxStyle: {
                ...this.state.boxStyle,
                width: selected ? width - 12 : width,
                height: selected ? height - 12: height,
                margin: selected ? 5 : 0,
                border: selected ? '2px solid black' : 'none',
            }
        };

        this.setState(boxStyleState);
    }

    handleColor() {
        const { color } = this.props;

        this.setState({
            boxStyle: {
                ...this.state.boxStyle,
                backgroundColor: color,
            }
        });
    }

    componentDidUpdate(prevProps) {
        const { selected, color } = this.props;
        const { selected : prevSelected, color: prevColor } = prevProps;

        const hasSelectedChanged = prevSelected !== selected;
        const hasColorChanged = prevColor !== color;

        if (hasColorChanged) this.handleColor();
        if (hasSelectedChanged) this.handleSize();
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
                boxStyle={this.state.boxStyle}
                reference={this.boxRef}
                handleToggle={this.handleToggle}
                handleDeleteCurrentBox={this.handleDeleteCurrentBox}
            />
        );
    };
}

export default BoxDraggableContainer;
