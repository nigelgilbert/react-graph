"use strict";

import React, { Component } from 'react';
import "./graph.css";
import { cluster } from "../../services/dbscan.js";
const PropTypes = React.PropTypes;

export class Graph extends Component {

  // const numbers = [
  //   [20, 40],
  //   [60, 82]
  // ];
  static propTypes = {
    points: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number))
  };

  static defaultProps = {
    points : []
  };

  constructor() {
    super();
  }

   _toSVG(points) {
    return points.map(this._stringify).join("\n");
  }

  _stringify(tuple) {
    return tuple.map(String).join(",");
  }

  render() {
    return (
      <div className="graph-container">
        <svg className="graph-svg">
          <polyline
           fill="none"
           stroke="black"
           strokeWidth="2.5"
           points={ this._toSVG(cluster(this.props.points)) }
           />
        </svg>
      </div>
    );
  }
}