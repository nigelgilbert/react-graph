"use strict";

import React from "react";
import "./app.css";
import { Graph } from "./graph/graph.react.js";

export class App extends React.Component {
  render() {
    return (
      <div>
        <h1 className="center">
          Here is a demo!
        </h1>
        <Graph />
      </div>
    );
  }
}