"use strict";

export class Points {
  constructor() {
    this._points = [
      [0,120],
      [20,60],
      [40,80],
      [60,20],
      [80,80],
      [100,80],
      [120,60],
      [140,100],
      [160,90],
      [180,80],
      [200,110],
      [220,10],
      [240,70],
      [260,100],
      [280,100],
      [300,40],
      [320,0],
      [340,100],
      [360,100],
      [380,120],
      [400,60],
      [420,70],
      [440,80]
    ];
    this.get = this.get.bind(this);
    this.getSVG = this.getSVG.bind(this);
  }

  get() {
    return this._points;
  }

  getSVG() {
    return this._points.map(stringify).join("\n");
  }
}

function stringify(tuple) {
  tuple.map(String);
  return tuple.join(",");
}