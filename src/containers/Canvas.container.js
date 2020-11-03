import React, { Component } from "react";
import Canvas from "../components/Canvas";

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

        this.mouseDown = this.mouseDown.bind(this);
        this.mouseMove = this.mouseMove.bind(this);
        this.mouseUp = this.mouseUp.bind(this);
        this.setMousePosition = this.setMousePosition.bind(this);
        this.isInBounds = this.isInBounds.bind(this);
    }

    mouseDown(event) {
        this.setState({ canvas: document.getElementById('canvas')});
        if (event.target.id === "canvas") {
            this.setState({ isSelectionOn: true });

            this.setState({
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

    mouseMove(event) {
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

    mouseUp() {
        const selectionSquare = this.state.canvas.querySelector(".selection");
        const boxes = [...this.state.canvas.querySelectorAll(".box")];

        if (selectionSquare) {
            const inBounds = [];

            for (const boxElement of boxes) {
                const box = this.store.getBoxById(boxElement.id);
                if (this.isInBounds(selectionSquare, boxElement)) {
                    box.toggle()
                }
            }

            if (inBounds.length) {
                for (const boxElement of inBounds) {
                    const box = this.store.getBoxById(boxElement.id);
                    box.toggle();
                }
            }
        }

        this.setState({ isSelectionOn: false });
        this.setState({ mouse: { x: 0, y: 0, startX: 0, startY: 0 }});
    }

    setMousePosition(event) {
        const currentEvent = event || window.event;

            if (currentEvent.pageX) {
                this.setState({
                    mouse: {
                        x: currentEvent.pageX + window.pageXOffset,
                        y: currentEvent.pageY + window.pageYOffset,
                        startX: this.state.mouse.startX,
                        startY: this.state.mouse.startY,
                    }
                });
            } else if (currentEvent.clientX) {
                this.setState({
                    mouse: {
                        x: currentEvent.clientX + document.body.scrollLeft,
                        y: currentEvent.clientY + document.body.scrollTop,
                        startX: this.state.mouse.startX,
                        startY: this.state.mouse.startY,
                    }
                });
            }
    }
    
    isInBounds(obj1, obj2) {
            const a = obj1.getBoundingClientRect();
            const b = obj2.getBoundingClientRect();
        
            return (
                a.x < b.x + b.width &&
                a.x + a.width > b.x &&
                a.y < b.y + b.height &&
                a.y + a.height > b.y
            );
    }

    render() {
        return (
            <Canvas 
                store={this.store}
                isSelectionOn={this.state.isSelectionOn}
                mouseUp={this.mouseUp}
                mouseDown={this.mouseDown}
                mouseMove={this.mouseMove}
                selectionWidth={this.state.selectionWidth}
                selectionHeight={this.state.selectionHeight}
                selectionLeft={this.state.selectionLeft}
                selectionTop={this.state.selectionTop}
            />
        )
    }
}

export default CanvasContainer;
