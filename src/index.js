import React from "react";
import ReactDOM from "react-dom";

const App = () => (
    <div>Hello World</div>
)

const node = document.getElementById("app");
ReactDOM.render(<App />, node);