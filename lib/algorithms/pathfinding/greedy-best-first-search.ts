import { Grid, GridNode } from "@/types";
import { getAllNodes, getTraversableNeighbors, heuristic } from "./helper";

export function greedyBFS(grid: Grid, startNode: GridNode, finishNode: GridNode) {
  const visitedNodesInOrder = [];
  const unvisitedNodes = getAllNodes(grid);
  startNode.heuristic = heuristic(startNode, finishNode);

  while (!!unvisitedNodes.length) {
    sortNodesByHeuristic(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();

    if (closestNode.heuristic === Infinity) return visitedNodesInOrder;
    if (closestNode === finishNode) return visitedNodesInOrder;

    visitedNodesInOrder.push(closestNode);
    closestNode.isVisited = true;

    updateUnvisitedNeighbors(closestNode, grid, finishNode);
  }
}

function sortNodesByHeuristic(unvisitedNodes: any) {
  unvisitedNodes.sort((nodeA: any, nodeB: any) => nodeA.heuristic - nodeB.heuristic);
}

function updateUnvisitedNeighbors(node: any, grid: any, finishNode: any) {
  const unvisitedNeighbors = getTraversableNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.previousNode = node;
    neighbor.heuristic = heuristic(neighbor, finishNode);
  }
}