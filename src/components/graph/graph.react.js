"use strict";

import React, { Component } from 'react';
import { Points } from "../../services/points.js";
import "./graph.css";

export class Graph extends Component {
  constructor() {
    super();
    this.Points = new Points();
  }

  render() {
    return (
      <div className="graph">
        <svg>
          <polyline
           fill="none"
           stroke="black"
           strokeWidth="4"
           points={ this.Points.getSVG() }
           />
        </svg>
      </div>
    );
  }
}