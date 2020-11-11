import React from "react";

import { observer } from "mobx-react";
import CanvasContainer from "../containers/Canvas.container";
import ToolbarContainer from "../containers/Toolbar.container";
import Instructions from "./Instructions";

function App() {
    return (
        <div className="app">
            <ToolbarContainer />
            <Instructions />
            <CanvasContainer />
        </div>
    );
}

export default observer(App);
