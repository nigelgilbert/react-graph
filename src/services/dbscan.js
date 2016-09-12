"use strict";

export function cluster(points, eps = 10, minPts = 2) {
  dbscan(points, eps, minPts);
  return points;
}

function dbscan(points, eps, minPts) {
  var cluster = null;
  points.forEach(point => {
    if (point.visited !== true) {
      point.visited = true;
      point.neighbors = findAllNeighbors(point, points)
    }
  });
}

function findAllNeighbors(point, eps) {
  // return all points within P's eps-neighborhood (including P)
}