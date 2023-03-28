export type GridNode = {
  row: number;
  col: number;
  isStart: boolean;
  isFinish: boolean;
  isWall: boolean;
  weight: number;
  heuristic?: number;
  isVisited: boolean;
  previousNode: GridNode | null;
  distance?: number;
};

export type Grid = GridNode[][];

export type GridLocation = {
  row: number;
  col: number;
}