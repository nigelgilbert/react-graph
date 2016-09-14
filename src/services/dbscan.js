"use strict";

const visited = new Map();
const clustered = new Map();

export function cluster(points, eps, minPts) {
  if (eps === undefined) {
    eps = 20;
  }
  if (minPts === undefined) {
    minPts = 2;
  }
  return dbscan(points, eps, minPts);
}

function dbscan(points, eps, minPts) {
  var results = [];
  points.forEach(point => {
    if (!visited.has(Symbol(point))) {
      visited.set(Symbol(point), true);
      const neighbors = findAllNeighbors(point, points, eps);
      // TEST
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
  var expanded = [];
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
  var neighbors = [];
  points.forEach(point => {
    if (distance(target, point) < eps)
      neighbors.push(point);
  });
  return neighbors;
}

function distance(left, right) {
   var d = Math.pow((right[0] - left[0]),2) + Math.pow((right[1] - left[1]),2);
   return Math.sqrt(Math.abs(d));
}

function center(cluster) {
  var center = [1,0];
  cluster.forEach(point => {
    center[0] += point[0];
    center[1] += point[1];
  });
  center[0] = center[0] / cluster.length;
  center[1] = center[1] / cluster.length;
  return center;
}