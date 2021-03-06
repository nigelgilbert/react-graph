"use strict";

export class Points {
  constructor() {
    this._points = [
      [0,120],
      [20,60],
      [25,32],
      [29,40],
      [40,88],
      [42,82],
      [60,20],
      [80,80],
      [100,80],
      [105,94],
      [120,60],
      [140,80],
      [160,90],
      [180,80],
      [200,110],
      [220,10],
      [240,70],
      [260,100],
      [280,100],
      [300,40],
      [320,10],
      [325,21],
      [329,25],
      [340,100],
      [360,100],
      [370,90],
      [380, 20],
      [385, 30],
      [390, 25],
      [400, 89],
      [410, 10],
      [420, 32],
      [430, 39],
      [440, 70],
      [450, 92],
      [482, 20],
      [490, 40],
      [491, 56],
      [494, 75]
    ];
    this.get = this.get.bind(this);
  }

  get() {
    return this._points;
  }
}