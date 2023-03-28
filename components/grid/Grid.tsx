import React from "react";
import Node from "./node/Node";
import { astar } from "@/lib/algorithms/pathfinding/a-star";
import { dijkstra } from "@/lib/algorithms/pathfinding/dijkstra";
import { bfs } from "@/lib/algorithms/pathfinding/breadth-first-search";
import { dfs } from "@/lib/algorithms/pathfinding/depth-first-search";
import { getNodesInShortestPathOrder } from "@/lib/algorithms/pathfinding/helper";
import { greedyBFS } from "@/lib/algorithms/pathfinding/greedy-best-first-search";
import { recursiveDivisionMaze } from "@/lib/algorithms/maze-generator/recursive-division";

import { GridNode, Grid, GridLocation } from "@/types";

import {
  FaWeightHanging,
  FaFlag,
  FaPlay,
  FaRedo,
  FaArrowDown,
} from "react-icons/fa";
import { GiBrickWall } from "react-icons/gi";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

const NUM_ROWS = 20;
const NUM_COLS = NUM_ROWS * 2;
const START_NODE_ROW = Math.ceil(NUM_ROWS / 2) - 1;
const START_NODE_COL = Math.ceil(NUM_COLS / 10);
const FINISH_NODE_ROW = START_NODE_ROW;
const FINISH_NODE_COL = NUM_COLS - START_NODE_COL - 1;

export default function Pathfinder() {
  const [mouseIsPressed, setMouseIsPressed] = React.useState(false);
  const [grid, setGrid] = React.useState<Grid>([]);
  const [startNode, setStartNode] = React.useState<GridLocation>({
    row: START_NODE_ROW,
    col: START_NODE_COL,
  });
  const [finishNode, setFinishNode] = React.useState<GridLocation>({
    row: FINISH_NODE_ROW,
    col: FINISH_NODE_COL,
  });
  const [algorithm, setAlgorithm] = React.useState("Dijkstra");
  const [object, setObject] = React.useState("Wall");

  React.useEffect(() => {
    const grid: Grid = initGrid();
    setGrid(grid);
  }, []);

  const resetGrid = () => {
    const grid: Grid = initGrid();
    resetVisitedNodes(grid);
    setMouseIsPressed(false);
    setGrid(grid);
    setStartNode({ row: START_NODE_ROW, col: START_NODE_COL });
    setFinishNode({ row: FINISH_NODE_ROW, col: FINISH_NODE_COL });
  }

  const handleMouseDown = (row: number, col: number) => {
    const { row: startRow, col: startCol } = startNode;
    const { row: finishRow, col: finishCol } = finishNode;
    if (row === startRow && col === startCol) return;
    if (row === finishRow && col === finishCol) return;
    setMouseIsPressed(true);

    if (object === "Wall") {
      const newGrid = getNewGridWithWallToggled(grid, row, col);
      setGrid(newGrid);
    } else if (object === "Weight") {
      const newGrid = getNewGridWithWeightToggled(grid, row, col);
      setGrid(newGrid);
    } else if (object === "Start") {
      const newNode = { row, col };
      const newGrid = getNewGridWithStartToggled(
        grid,
        newNode,
        startNode
      );
      setGrid(newGrid);
      setStartNode({ row, col });
    } else if (object === "Finish") {
      const newNode = { row, col };
      const newGrid = getNewGridWithFinishToggled(
        grid,
        newNode,
        finishNode
      );
      setGrid(newGrid);
      setFinishNode({ row, col });
    }
  }

  const handleMouseEnter = (row: number, col: number) => {
    if (!mouseIsPressed) return;
    const { row: startRow, col: startCol } = startNode;
    const { row: finishRow, col: finishCol } = finishNode;
    if (row === startRow && col === startCol) return;
    if (row === finishRow && col === finishCol) return;

    if (object === "Wall") {
      const newGrid = getNewGridWithWallToggled(grid, row, col);
      setGrid(newGrid);
    } else if (object === "Weight") {
      const newGrid = getNewGridWithWeightToggled(grid, row, col);
      setGrid(newGrid);
    } else if (object === "Start") {
      const newNode = { row, col };
      const newGrid = getNewGridWithStartToggled(
        grid,
        newNode,
        startNode
      );
      setGrid(newGrid);
      setStartNode({ row, col });
    } else if (object === "Finish") {
      const newNode = { row, col };
      const newGrid = getNewGridWithFinishToggled(
        grid,
        newNode,
        finishNode
      );
      setGrid(newGrid);
      setFinishNode({ row, col });
    }
  }

  const handleMouseUp = (row: number, col: number) => {
    setMouseIsPressed(false);
  }

  const handleVisualize = () => {
    const start = grid[startNode.row][startNode.col];
    const finish = grid[finishNode.row][finishNode.col];

    if (algorithm === "BFS") {
      visualizeBFS(grid, start, finish);
    } else if (algorithm === "DFS") {
      visualizeDFS(grid, start, finish);
    } else if (algorithm === "Dijkstra") {
      visualizeDijkstra(grid, start, finish);
    } else if (algorithm === "A*") {
      visualizeAStar(grid, start, finish);
    } else if (algorithm === "GBFS") {
      visualizeGreedyBFS(grid, start, finish);
    }
  }

  const visualizeDijkstra = (grid: Grid, startNode: GridNode, finishNode: GridNode) => {
    const visitedNodesInOrder: GridNode[] = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    animateVisitedNodes(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  const visualizeBFS = (grid: Grid, startNode: GridNode, finishNode: GridNode) => {
    const visitedNodesInOrder: GridNode[] = bfs(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    animateVisitedNodes(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  const visualizeDFS = (grid: Grid, startNode: GridNode, finishNode: GridNode) => {
    const visitedNodesInOrder: GridNode[] = dfs(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    animateVisitedNodes(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  const visualizeAStar = (grid: Grid, startNode: GridNode, finishNode: GridNode) => {
    const visitedNodesInOrder: GridNode[] = astar(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    animateVisitedNodes(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  const visualizeGreedyBFS = (grid: Grid, startNode: GridNode, finishNode: GridNode) => {
    const visitedNodesInOrder: GridNode[] = greedyBFS(
      grid,
      startNode,
      finishNode
    );
    const nodesInShortestPathOrder: GridNode[] = getNodesInShortestPathOrder(finishNode);
    animateVisitedNodes(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  const animateVisitedNodes = (visitedNodesInOrder: GridNode[], nodesInShortestPathOrder: GridNode[]) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        const nodeElement = document.getElementById(
          `node-${node.row}-${node.col}`
        );
        if (!nodeElement) return;
        if (node.weight === 1) {
          nodeElement.className = "node node-visited";
        } else {
          nodeElement.className = "node node-visited-weight";
        }
      }, 10 * i);
    }
  }

  const animateShortestPath = (nodesInShortestPathOrder: any) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        const nodeElement = document.getElementById(
          `node-${node.row}-${node.col}`
        );
        if (!nodeElement) return;
        if (node.weight === 1) {
          nodeElement.className = "node node-shortest-path";
        } else {
          nodeElement.className = "node node-shortest-path-weight";
        }
      }, 50 * i);
    }
  }

  const handleGenerateMaze = () => {
    const visitedNodesInOrder: GridNode[] = recursiveDivisionMaze(grid, startNode, finishNode);
    for (let i = 0; i < visitedNodesInOrder.length; i++) {
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        const newGrid = getNewGridWithWallToggled(grid, node.row, node.col);
        setGrid(newGrid);
      }, 10 * i);
    }
  }

  return (
    <Container>
      <Row>
        <Col>
          <ButtonGroup>
            <Button
              variant="outline-secondary"
              onClick={() => setObject("Wall")}
              active={object === "Wall"}
            >
              <GiBrickWall />
              Wall
            </Button>
            {(algorithm === "Dijkstra" ||
              algorithm === "A*") && (
                <Button
                  variant="outline-dark"
                  onClick={() => setObject("Weight")}
                  active={object === "Weight"}
                >
                  <FaWeightHanging />
                  Weight
                </Button>
              )}
            <Button
              variant="outline-danger"
              onClick={() => setObject("Start")}
              active={object === "Start"}
            >
              <FaArrowDown />
              Start
            </Button>
            <Button
              variant="outline-success"
              onClick={() => setObject("Finish")}
              active={object === "Finish"}
            >
              <FaFlag />
              Finish
            </Button>
          </ButtonGroup>
        </Col>
        <Col>
          <ButtonToolbar>
            <Button onClick={() => handleGenerateMaze()}>
              Generate Maze
            </Button>
            <DropdownButton
              variant="outline-dark"
              className="mx-1"
              id="algorithm-dropdown"
              title={algorithm}
            >
              <Dropdown.Item
                onClick={() => setAlgorithm("BFS")}
              >
                Breadth First Search
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => setAlgorithm("DFS")}
              >
                Depth First Search
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => setAlgorithm("Dijkstra")}
              >
                Dijkstra
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => setAlgorithm("A*")}
              >
                A* Search
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => setAlgorithm("GBFS")}
              >
                Greedy Best First Search
              </Dropdown.Item>
            </DropdownButton>
            <Button
              variant="dark"
              className="mx-1"
              onClick={() => resetGrid()}
            >
              <FaRedo />
              Reset
            </Button>
            <Button
              variant="success"
              className="mx-1"
              onClick={() => handleVisualize()}
            >
              <FaPlay />
              Visualize {algorithm}
            </Button>
          </ButtonToolbar>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="grid">
            {grid.map((row, rowIdx) => {
              return (
                <div key={rowIdx} className="grid-row">
                  {row.map((node, nodeIdx) => {
                    const { row, col, isStart, isFinish, isWall, weight } =
                      node;
                    return (
                      <Node
                        key={nodeIdx}
                        row={row}
                        col={col}
                        isStart={isStart}
                        isFinish={isFinish}
                        isWall={isWall}
                        weight={weight}
                        onMouseDown={() =>
                          handleMouseDown(rowIdx, nodeIdx)
                        }
                        onMouseUp={() => handleMouseUp(rowIdx, nodeIdx)}
                        onMouseOver={() =>
                          handleMouseEnter(rowIdx, nodeIdx)
                        }
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

function initGrid() {
  const grid = [];

  for (let row = 0; row < NUM_ROWS; row++) {
    const currentRow = [];
    for (let col = 0; col < NUM_COLS; col++) {
      currentRow.push(createNode(row, col));
    }
    grid.push(currentRow);
  }

  return grid;
}

function resetVisitedNodes(grid: Grid) {
  for (let row = 0; row < NUM_ROWS; row++) {
    for (let col = 0; col < NUM_COLS; col++) {
      if (row === START_NODE_ROW && col === START_NODE_COL) {
        const node = document.getElementById(`node-${row}-${col}`);
        if (!node) return;
        node.className =
          "node node-start";
        continue;
      }

      if (row === FINISH_NODE_ROW && col === FINISH_NODE_COL) {
        const node = document.getElementById(`node-${row}-${col}`);
        if (!node) return;
        node.className =
          "node node-finish";
        continue;
      }

      const node = document.getElementById(`node-${row}-${col}`);
      if (!node) return;
      node.className = "node";
    }
  }
}

function createNode(row: number, col: number) {
  return {
    row,
    col,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    isVisited: false,
    distance: Infinity,
    heuristic: Infinity,
    isWall: false,
    weight: 1,
    previousNode: null,
  };
}

function getNewGridWithWallToggled(grid: Grid, row: number, col: number) {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
}

function getNewGridWithWeightToggled(grid: Grid, row: number, col: number) {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    weight: node.weight === 1 ? 3 : 1,
  };
  newGrid[row][col] = newNode;
  return newGrid;
}

function getNewGridWithStartToggled(grid: Grid, newNode: GridLocation, oldNode: GridLocation) {
  const newGrid = grid.slice();

  const oldStart = newGrid[oldNode.row][oldNode.col];
  const changedOld = {
    ...oldStart,
    isStart: false,
  };
  newGrid[oldNode.row][oldNode.col] = changedOld;

  const { row, col } = newNode;
  const newStart = newGrid[row][col];
  const changedNew = {
    ...newStart,
    isStart: true,
  };
  newGrid[row][col] = changedNew;

  return newGrid;
}

function getNewGridWithFinishToggled(grid: Grid, newNode: GridLocation, oldNode: GridLocation) {
  const newGrid = grid.slice();

  const oldFinish = newGrid[oldNode.row][oldNode.col];
  const changedOld = {
    ...oldFinish,
    isFinish: false,
  };
  newGrid[oldNode.row][oldNode.col] = changedOld;

  const { row, col } = newNode;
  const newFinish = newGrid[row][col];
  const changedNew = {
    ...newFinish,
    isFinish: true,
  };
  newGrid[row][col] = changedNew;

  return newGrid;
}
