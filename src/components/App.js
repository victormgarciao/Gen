import React from "react";

import store from "../stores/MainStore";
import Toolbar from "./Toolbar";
import { observer } from "mobx-react";
import CanvasContainer from "../containers/Canvas.container";

function App() {
    return (
        <div className="app">
            <Toolbar />
            <CanvasContainer store={store} />
        </div>
    );
}

export default observer(App);
