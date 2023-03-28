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

  return visitedNodesInOrder;
}

function sortNodesByHeuristic(unvisitedNodes: GridNode[]) {
  unvisitedNodes.sort((nodeA: any, nodeB: any) => nodeA.heuristic - nodeB.heuristic);
}

function updateUnvisitedNeighbors(node: GridNode, grid: Grid, finishNode: GridNode) {
  const unvisitedNeighbors: GridNode[] = getTraversableNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.previousNode = node;
    neighbor.heuristic = heuristic(neighbor, finishNode);
  }
}