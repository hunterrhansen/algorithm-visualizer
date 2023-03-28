import { Grid, GridNode } from "@/types";
import { getAllNodes, getTraversableNeighbors } from "./helper";

export function dijkstra(grid: Grid, startNode: GridNode, finishNode: GridNode) {
  const visitedNodesInOrder: GridNode[] = []; // closed list
  const unvisitedNodes = getAllNodes(grid); // open list
  startNode.distance = 1; // g-cost, distance from start node to current node

  while (!!unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();

    if (closestNode.distance === Infinity) return visitedNodesInOrder;
    if (closestNode === finishNode) return visitedNodesInOrder;

    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);

    updateUnvisitedNeighbors(closestNode, grid);
  }

  return visitedNodesInOrder;
}

function sortNodesByDistance(unvisitedNodes: any) {
  unvisitedNodes.sort((nodeA: any, nodeB: any) => nodeA.distance - nodeB.distance);
}

function updateUnvisitedNeighbors(node: any, grid: any) {
  const unvisitedNeighbors = getTraversableNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + neighbor.weight;
    neighbor.previousNode = node;
  }
}