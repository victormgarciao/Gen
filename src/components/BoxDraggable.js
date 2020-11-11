import React, { Fragment } from "react";
import { observer } from "mobx-react";
import CloseDeleteButton from "./BoxDeleteButton";

function BoxDraggable(props) {
    const {
        boxStyle,
        children,
        handleDeleteCurrentBox,
        handleToggle,
        id,
        reference,
        selected,
    } = props;

    return (
        <Fragment>
            <div
                id={id}
                className={`box ${selected ? 'selected' : ''}`}
                style={boxStyle}
                onClick={(handleToggle)}
                ref={reference}
            >
                { selected && <CloseDeleteButton action={handleDeleteCurrentBox} /> }
                { children }
            </div>
        </Fragment>
    );
}

export default observer(BoxDraggable);
