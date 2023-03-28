interface Props {
  row: number;
  col: number;
  isStart: boolean;
  isFinish: boolean;
  isWall: boolean;
  weight: number;
  onMouseDown: (row: number, col: number) => void;
  onMouseOver: (row: number, col: number) => void;
  onMouseUp: (row: number, col: number) => void;
}

const Node = ({ row, col, isStart, isFinish, isWall, weight, onMouseDown, onMouseOver, onMouseUp }: Props) => {
  const cssClass = isStart ? "node-start" : isFinish ? "node-finish": isWall ? "node-wall" : weight === 3  ? "node-weight" : "";

  return (
    <div
      id={`node-${row}-${col}`}
      className={`node ${cssClass}`}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseOver={() => onMouseOver(row, col)}
      onMouseUp={() => onMouseUp(row, col)}
    />
  );
}

export default Node;