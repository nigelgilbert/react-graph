"use strict";

const visited = new Map();
const clustered = new Map();

export function cluster(points, eps = 10, minPts = 2) {
  return dbscan(points, eps, minPts);
}

function dbscan(points, eps, minPts) {
  var results = [];
  points.forEach(point => {
    if (!visited.has(point)) {
      visited.set(point, true);
      const neighbors = findAllNeighbors(point, points, eps);
      if (points.length < minPts) {
        results.push(point);
      } else {
        const cluster = expandCluster(points, neighbors, eps, MinPts);
        results.push(center(cluster));
      }
    }
    return results;
  });
}

function expandCluster(points, neighbors, eps, minPts) {
  var cluster = [];
  neighbors.forEach(point => {
    if (!visited.has(point)) {
      visited.set(point, true);
      const neighborsNeighbors = findAllNeighbors(neighbors, points, eps);
      if (neighborsNeighbors.length >= minPts) {
        neighbors.concat(neighborsNeighbors);
      }  
    } 
    if (!clustered.has(point)) {
      clustered.set(point, true);
      cluster.push(point);
    }
  });
  return cluster;
}

// target is included in neighbors array
function findAllNeighbors(target, points, eps) {
  var neighbors = [];
  points.forEach(point => {
    if (distance(target, point) > eps)
      neighbors.push(point);
  });
  return neighbors;
}

function distance(left, right) {
   var d = Math.pow((right.x - left.x), 2) + Math.pow((right.y - left.y), 2);
   return Math.sqrt(Math.abs(d));
}

function center(cluster) {
  return cluster.reduce((a, b) => {
    var center = [0,0];
    center[0] = a[0] + b[0];
    center[1] = a[1] + b[1];
    return center;
  });
}