"use strict";

const visited = new Map();
const clustered = new Map();

export function cluster(points, eps, minPts) {
  if (eps === undefined)
    eps = 20;
  if (minPts === undefined)
    minPts = 2;

  return smooth(dbscan(points, eps, minPts));
}

function dbscan(points, eps, minPts) {
  const results = [];
  points.forEach(point => {
    if (!visited.has(Symbol(point))) {
      visited.set(Symbol(point), true);
      const neighbors = findAllNeighbors(point, points, eps);
      if (neighbors.length < minPts) {
        results.push(point);
      } else {
        const cluster = expandCluster(points, neighbors, eps, minPts);
        results.push(center(cluster));
      }
    }
  });
  return results;
}

function expandCluster(points, neighbors, eps, minPts) {
  const expanded = [];
  neighbors.forEach(point => {
    if (!visited.has(Symbol(point))) {
      visited.set(Symbol(point), true);
      const neighborsNeighbors = findAllNeighbors(point, points, eps);
      if (neighborsNeighbors.length >= minPts) {
        neighbors.concat(neighborsNeighbors);
      }
    }
    if (!clustered.has(Symbol(point))) {
      clustered.set(Symbol(point), true);
      expanded.push(point);
    }
  });
  return expanded;
}

// target is included in neighbors array
function findAllNeighbors(target, points, eps) {
  const neighbors = [];
  points.forEach(point => {
    if (distance(target, point) < eps)
      neighbors.push(point);
  });
  return neighbors;
}

function distance(left, right) {
   const x = Math.pow((right[0] - left[0]), 2)
   const y = Math.pow((right[1] - left[1]), 2);
   return Math.sqrt(Math.abs(x + y));
}

function center(cluster) {
  const center = [0,0];
  cluster.forEach(point => {
    center[0] += point[0];
    center[1] += point[1];
  });
  center[0] = center[0] / cluster.length;
  center[1] = center[1] / cluster.length;
  return center;
}

function smooth(linegraph) {
  var smoothed = [];
  for (var i = 1; i < linegraph.length; i++) {
    if (linegraph[i][0] > linegraph[i-1][0]) {
      smoothed.push(linegraph[i]);
    }
  }
  return smoothed;
}