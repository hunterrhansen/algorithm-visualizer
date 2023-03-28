export function getNodesInShortestPathOrder(finishNode: any) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}

export function getAllNodes(grid: any) {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}

export function getTraversableNeighbors(node: any, grid: any) {
  const neighbors = [];
  const {col, row} = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter(neighbor => !neighbor.isVisited && !neighbor.isWall);
}

export function heuristic(node: any, endNode: any) {
  const {row: row1, col: col1} = node;
  const {row: row2, col: col2} = endNode;
  const rowDistance = Math.abs(row1 - row2);
  const colDistance = Math.abs(col1 - col2);
  return rowDistance + colDistance;
}