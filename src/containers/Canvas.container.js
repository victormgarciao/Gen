import React, { Component } from "react";
import Canvas from "../components/Canvas";
import { updateAxisOfAllBoxes } from "../utils/boxes/position.utils";
import { bindContextToFunctionList } from "../utils/react/react";
import { isObject2InsideObject1 } from "../utils/selection/selection.utils";

class CanvasContainer extends Component {
    constructor(props) {
        super(props)

        this.store = props.store;
        
        this.state = {
            canvas: document.getElementById('canvas'),
            isSelectionOn: false,
            mouse: {
                x: 0,
                y: 0,
                startX: 0,
                startY: 0
            },
            selectionWidth: 0,
            selectionHeight: 0,
            selectionLeft: 0,
            selectionTop: 0,
        }

        const bindThisToFunctions = bindContextToFunctionList(this);
        bindThisToFunctions([
            'handleMouseDown',
            'handleMouseMove',
            'handleMouseUp',
            'setMousePosition',
            'resetSelection'
        ]);
    }


    handleMouseDown(event) {
        this.setState({ canvas: document.getElementById('canvas')});
        const isThisTargetCanvas = event.target.id === "canvas";

        if (isThisTargetCanvas) {
            this.setState({
                isSelectionOn: true,
                mouse: {
                    x: event.pageX,
                    y: event.pageY,
                    startX: event.pageX,
                    startY: event.pageY,
                },
                selectionLeft: this.state.mouse.x,
                selectionTop: this.state.mouse.y,
            });
        }
    }


    handleMouseMove(event) {
        if (this.state.isSelectionOn) {
            this.setMousePosition(event);
            const { mouse } = this.state;
            const diffMouseX = mouse.x - mouse.startX;
            const diffMouseY = mouse.y - mouse.startY;
            const isOnTheLeft = diffMouseX < 0;
            const isOnTheTop = diffMouseY < 0;
            function getPositionFormated(position) { return `${position}px` }

            this.setState({
                selectionWidth: Math.abs(diffMouseX),
                selectionHeight: Math.abs(diffMouseY),
                selectionLeft:  isOnTheLeft ? getPositionFormated(mouse.x) : getPositionFormated(mouse.startX),
                selectionTop: isOnTheTop ? getPositionFormated(mouse.y): getPositionFormated(mouse.startY)
            });
        }
    }


    handleMouseUp() {
        const selectionSquare = this.state.canvas.querySelector(".selection");
        const allBoxesElements = [...this.state.canvas.querySelectorAll(".box")];
        const isInsideSelection = isObject2InsideObject1(selectionSquare);
        const store = this.store;

        function handleSelection() {
            for (const boxElement of allBoxesElements) {
                const box = store.getBoxById(boxElement.id);
                box.unselect();
                if (isInsideSelection(boxElement)) { box.select(); }
            }
        }

        if (selectionSquare) { handleSelection(); }
        this.resetSelection();
    }
    

    resetSelection() {
        this.setState({
            isSelectionOn: false,
            mouse: { x: 0, y: 0, startX: 0, startY: 0 },
        });
    }


    setMousePosition(event) {
        const currentEvent = event || window.event;

        this.setState({
            mouse: {
                x: currentEvent.pageX + window.pageXOffset,
                y: currentEvent.pageY + window.pageYOffset,
                startX: this.state.mouse.startX,
                startY: this.state.mouse.startY,
            }
        });
    }

    componentDidMount() {
        updateAxisOfAllBoxes();
    }
    

    render() {
        return (
            <Canvas 
                store={this.store}
                isSelectionOn={this.state.isSelectionOn}
                handleMouseUp={this.handleMouseUp}
                handleMouseDown={this.handleMouseDown}
                handleMouseMove={this.handleMouseMove}
                selectionWidth={this.state.selectionWidth}
                selectionHeight={this.state.selectionHeight}
                selectionLeft={this.state.selectionLeft}
                selectionTop={this.state.selectionTop}
            />
        )
    }
}

export default CanvasContainer;
