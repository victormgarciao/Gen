import React, { Fragment } from "react";
import { observer } from "mobx-react";
import CloseDeleteButton from "./BoxDeleteButton";

function BoxDraggable(props) {
    const {
        boxStyle,
        children,
        classNameList,
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
                className={classNameList}
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
