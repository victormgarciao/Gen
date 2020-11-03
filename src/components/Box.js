import React from "react";
import { observer } from "mobx-react";
import BoxDraggableContainer from "../containers/BoxDraggable.container";

function Box(props) {
  return (
    <BoxDraggableContainer {...props}>
      <div>Box</div>
    </BoxDraggableContainer>
  );
}

export default observer(Box);
