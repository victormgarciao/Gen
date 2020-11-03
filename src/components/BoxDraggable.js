import React from "react";
import { observer } from "mobx-react";

function BoxDraggable(props) {
    return (
        <div
            id={props.id}
            className={`box ${props.selected ? 'selected' : ''}`}
            style={{
                backgroundColor: props.color,
                width: props.selected ? props.width - 12 : props.width,
                height: props.selected ? props.height - 12 : props.height,
                margin: props.selected ? 5 : 0,
                border: props.selected ? '2px solid black' : 'none',
                transform: `translate(${props.left}px, ${props.top}px)`,
                userSelect: 'none'
            }}
            onClick={(props.handleToggle)}
            ref={props.reference}
        >
            {props.children}
        </div>
    );
}

export default observer(BoxDraggable);
