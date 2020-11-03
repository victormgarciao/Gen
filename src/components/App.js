import React from "react";

import store from "../stores/MainStore";
import Toolbar from "./Toolbar";
import { observer } from "mobx-react";
import Canvas from "./Canvas";

function App() {
    return (
        <div className="app">
            <Toolbar />
            <Canvas store={store} />
        </div>
    );
}

export default observer(App);
