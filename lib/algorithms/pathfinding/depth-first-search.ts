import { Grid, GridNode } from "@/types";
import { getTraversableNeighbors } from "./helper";

export function dfs(grid: Grid, startNode: GridNode, finishNode: GridNode) {
  const visitedNodesInOrder = []; // closed list
  const stack = [startNode]; // open list

  while (stack.length > 0) {
    const node = stack.pop();

    if (node.isVisited) continue;
    if (node === finishNode) return visitedNodesInOrder;

    visitedNodesInOrder.push(node);
    node.isVisited = true;

    const neighbors = getTraversableNeighbors(node, grid);
    for (const neighbor of neighbors) {
      neighbor.previousNode = node;
      stack.push(neighbor);
    }
  }
  return visitedNodesInOrder;
}