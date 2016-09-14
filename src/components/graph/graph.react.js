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
    this.state = {
      eps : 0,
      minPts: 2,
    }
    this._handleEpsSlider = this._handleEpsSlider.bind(this);
    this._handleMinPtsSlider = this._handleMinPtsSlider.bind(this);
  }

   _toSVG(points) {
    return points.map(this._stringify).join("\n");
  }

  _stringify(tuple) {
    return tuple.map(String).join(",");
  }

  _handleEpsSlider(event) {
    this.setState({eps: event.target.value});
  }

  _handleMinPtsSlider(event) {
    this.setState({minPts: event.target.value});
  }

  render() {
    return (
      <div>
        <div className="graph-container">
          <div className="graph-label">
            dbscan
          </div>

          <svg className="graph-svg">
            <polyline
             fill="none"
             stroke="black"
             strokeWidth="3"
             strokeLinejoin="round"
             points={ this._toSVG(cluster(this.props.points, this.state.eps, this.state.minPts)) }
             />
          </svg>

          <div className="graph-label">
            eps: {this.state.eps}
            <br></br>
            minPts: {this.state.minPts}
          </div>
        </div>

        <input
          id="eps-input"
          type="range"
          min="0" max="50"
          value={this.state.eps}
          onChange={this._handleEpsSlider}
          step="1"
        />

        <input
          id="min-pts-input"
          type="range"
          min="2" max="5"
          value={this.state.minPts}
          onChange={this._handleMinPtsSlider}
          step="1"
        />
      </div>
    );
  }
}