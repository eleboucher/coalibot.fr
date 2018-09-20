import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Latest from "./Latest";
import Stat from "./Stat";

ReactDOM.render(<App />, document.getElementById("app"));
ReactDOM.render(<Latest />, document.getElementById("latest"));
ReactDOM.render(<Stat />, document.getElementById("nbuser"));
