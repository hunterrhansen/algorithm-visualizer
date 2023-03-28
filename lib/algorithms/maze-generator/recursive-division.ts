import { Grid, GridNode } from "@/types";

let walls: any[];
export function recursiveDivisionMaze(grid: Grid, startNode: GridNode, finishNode: GridNode) {
  if (!startNode || !finishNode || startNode === finishNode) {
    return false;
  }
  let vertical = range(grid[0].length);
  let horizontal = range(grid.length);
  walls = [];
  getRecursiveWalls(vertical, horizontal, grid, startNode, finishNode);
  return walls;
}

function range(len: any) {
  let result = [];
  for (let i = 0; i < len; i++) {
    result.push(i);
  }
  return result;
}

//dir === 0 => Horizontal
//dir === 1 => Vertical

function getRecursiveWalls(vertical: any, horizontal: any, grid: Grid, startNode: GridNode, finishNode: GridNode) {
  if (vertical.length < 2 || horizontal.length < 2) {
    return;
  }
  let dir;
  let num;
  if (vertical.length > horizontal.length) {
    dir = 0;
    num = generateOddRandomNumber(vertical);
  }
  if (vertical.length <= horizontal.length) {
    dir = 1;
    num = generateOddRandomNumber(horizontal);
  }

  if (dir === 0) {
    addWall(dir, num, vertical, horizontal, startNode, finishNode, grid);
    getRecursiveWalls(
      vertical.slice(0, vertical.indexOf(num)),
      horizontal,
      grid,
      startNode,
      finishNode
    );
    getRecursiveWalls(
      vertical.slice(vertical.indexOf(num) + 1),
      horizontal,
      grid,
      startNode,
      finishNode
    );
  } else {
    addWall(dir, num, vertical, horizontal, startNode, finishNode, grid);
    getRecursiveWalls(
      vertical,
      horizontal.slice(0, horizontal.indexOf(num)),
      grid,
      startNode,
      finishNode
    );
    getRecursiveWalls(
      vertical,
      horizontal.slice(horizontal.indexOf(num) + 1),
      grid,
      startNode,
      finishNode
    );
  }
}

function generateOddRandomNumber(array: any) {
  let max = array.length - 1;
  let randomNum =
    Math.floor(Math.random() * (max / 2)) +
    Math.floor(Math.random() * (max / 2));
  if (randomNum % 2 === 0) {
    if (randomNum === max) {
      randomNum -= 1;
    } else {
      randomNum += 1;
    }
  }
  return array[randomNum];
}

//dir === 0 => Horizontal
//dir === 1 => Vertical

function addWall(dir: any, num: any, vertical: any, horizontal: any, startNode: any, finishNode: any, grid: any) {
  let isStartFinish = false;
  let tempWalls = [];
  if (dir === 0) {
    if (horizontal.length === 2) return;
    for (let temp of horizontal) {
      if (
        (temp === startNode.row && num === startNode.col) ||
        (temp === finishNode.row && num === finishNode.col)
      ) {
        isStartFinish = true;
        continue;
      }
      tempWalls.push(grid[temp][num]);
    }
  } else {
    if (vertical.length === 2) return;
    for (let temp of vertical) {
      if (
        (num === startNode.row && temp === startNode.col) ||
        (num === finishNode.row && temp === finishNode.col)
      ) {
        isStartFinish = true;
        continue;
      }
      tempWalls.push(grid[num][temp]);
    }
  }
  if (!isStartFinish) {
    tempWalls.splice(generateRandomNumber(tempWalls.length), 1);
  }
  for (let wall of tempWalls) {
    walls.push(wall);
  }
}

function generateRandomNumber(max: any) {
  let randomNum =
    Math.floor(Math.random() * (max / 2)) +
    Math.floor(Math.random() * (max / 2));
  if (randomNum % 2 !== 0) {
    if (randomNum === max) {
      randomNum -= 1;
    } else {
      randomNum += 1;
    }
  }
  return randomNum;
}