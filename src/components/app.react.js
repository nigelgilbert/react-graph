"use strict";

import React from "react";
import "./app.css";
import { Graph } from "./graph/graph.react.js";
import { Points } from "../services/points.js";

export class App extends React.Component {

  constructor() {
    super();
    this.Points = new Points();
  }

  render() {
    return (
      <div>
        <h1 className="title">
          React Graph
        </h1>
        <Graph points={ this.Points.get() }/>
      </div>
    );
  }
}