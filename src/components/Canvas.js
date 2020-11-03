import React from "react";

import { observer } from "mobx-react";
import Box from "../components/Box";
import { values } from "mobx";
import store from "../stores/MainStore";

let canvas;
let element;
const mouse = {
    x: 0,
    y: 0,
    startX: 0,
    startY: 0
};

function mouseDown(e) {
    canvas = document.getElementById('canvas');
    if (e.target.id === "canvas") {
        const rects = [...canvas.querySelectorAll(".selection")];

        if (rects) {
            for (const rect of rects) {
                canvas.removeChild(rect);
            }
        }

        mouse.startX = mouse.x;
        mouse.startY = mouse.y;
        element = document.createElement("div");
        element.className = "selection";
        element.style.border = "1px dashed black";
        element.style.position = "absolute";
        element.style.left = mouse.x + "px";
        element.style.top = mouse.y + "px";
        canvas.appendChild(element);
    }
}

function mouseMove(e) {
    setMousePosition(e);
    if (element) {
        element.style.width = Math.abs(mouse.x - mouse.startX) + "px";
        element.style.height = Math.abs(mouse.y - mouse.startY) + "px";
        element.style.left =
        mouse.x - mouse.startX < 0 ? mouse.x + "px" : mouse.startX + "px";
        element.style.top =
        mouse.y - mouse.startY < 0 ? mouse.y + "px" : mouse.startY + "px";
    }
}

function mouseUp(e) {
    element = null;

    const rect = canvas.querySelector(".selection");
    const boxes = [...canvas.querySelectorAll(".box")];

    if (rect) {
        const inBounds = [];

        for (const box of boxes) {
            if (isInBounds(rect, box)) {
                inBounds.push(box);
            } else {
                box.style.boxShadow = "none";
                box.classList.remove("selected");
            }
        }

        if (inBounds.length) {
            for (const boxElement of inBounds) {
                const box = store.getBoxById(boxElement.id);
                box.toggle();
            }
        }

        if (rect) canvas.removeChild(canvas.querySelector(".selection"));
    }
}

function setMousePosition(e) {
    const ev = e || window.event;
  
        if (ev.pageX) {
            mouse.x = ev.pageX + window.pageXOffset;
            mouse.y = ev.pageY + window.pageYOffset;
        } else if (ev.clientX) {
            mouse.x = ev.clientX + document.body.scrollLeft;
            mouse.y = ev.clientY + document.body.scrollTop;
        }
  }
  
  function isInBounds(obj1, obj2) {
        const a = obj1.getBoundingClientRect();
        const b = obj2.getBoundingClientRect();
    
        return (
            a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y
        );
  }



function Canvas({ store }) {
    return (
        <div className="canva" id="canvas" onMouseUp={mouseUp} onMouseDown={mouseDown} onMouseMove={mouseMove}>
            {values(store.boxes).map((box, index) => (
                <Box
                    id={box.id}
                    key={index}
                    color={box.color}
                    left={box.left}
                    top={box.top}
                    width={box.width}
                    height={box.height}
                    selected={box.selected}
                    box={box}
                    toggle={box.toggle}
                />
            ))}
        </div>
    );
}

export default observer(Canvas);
