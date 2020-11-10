import React, { Component } from "react";
import Canvas from "../components/Canvas";
import { updateAxisOfAllBoxes } from "../utils/boxes/position.utils";
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

        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.setMousePosition = this.setMousePosition.bind(this);
        this.resetSelection = this.resetSelection.bind(this);
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
            this.setState({
                selectionWidth: Math.abs(this.state.mouse.x - this.state.mouse.startX),
                selectionHeight: Math.abs(this.state.mouse.y - this.state.mouse.startY),
                selectionLeft: this.state.mouse.x - this.state.mouse.startX < 0 ? this.state.mouse.x + "px" : this.state.mouse.startX + "px",
                selectionTop: this.state.mouse.y - this.state.mouse.startY < 0 ? this.state.mouse.y + "px": this.state.mouse.startY + "px"
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
