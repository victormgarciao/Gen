import React, { Fragment } from "react";
import { observer } from "mobx-react";
import CloseDeleteButton from "./BoxDeleteButton";

function BoxDraggable(props) {
    const {
        box: { remove },
        children,
        color,
        handleToggle,
        height,
        id,
        left,
        reference,
        selected,
        top,
        width,
    } = props;

    return (
        <Fragment>
            <div
                id={id}
                className={`box ${selected ? 'selected' : ''}`}
                style={{
                    backgroundColor: color,
                    width: selected ? width - 12 : width,
                    height: selected ? height - 12 : height,
                    margin: selected ? 5 : 0,
                    border: selected ? '2px solid black' : 'none',
                    transform: `translate(${left}px, ${top}px)`,
                    userSelect: 'none'
                }}
                onClick={(handleToggle)}
                ref={reference}
            >
                { selected && (
                    <CloseDeleteButton action={remove} />
                )}
                {children}
            </div>
        </Fragment>
    );
}

export default observer(BoxDraggable);
