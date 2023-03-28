import { Grid, GridNode } from "@/types";
import { getTraversableNeighbors } from "./helper";

export function bfs(grid: Grid, startNode: GridNode, finishNode: GridNode) {
  const visitedNodesInOrder: GridNode[] = [];
  
  const queue = [startNode];
  while (queue.length > 0) {
    const node = queue.shift();

    if (!node) return visitedNodesInOrder;

    if (node.isVisited) continue;
    if (node === finishNode) return visitedNodesInOrder;

    visitedNodesInOrder.push(node);
    node.isVisited = true;

    const neighbors = getTraversableNeighbors(node, grid);
    for (const neighbor of neighbors) {
      neighbor.previousNode = node;
      queue.push(neighbor);
    }
  }
  return visitedNodesInOrder;
}