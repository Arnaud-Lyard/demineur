interface Cell {
  x: number;
  y: number;
  val: number | "bomb";
  revealed: boolean;
}

export type Board = Cell[][];

export const createEmptyBoard = (size: number): Board => {
  let board: Board = [];
  for (let i = 0; i < size; i++) {
    board[i] = [];
    for (let j = 0; j < size; j++) {
      board[i][j] = { x: i, y: j, val: 0, revealed: false };
    }
  }
  return board;
};

export const forEachCell = (board: Board, fn: (cell: Cell) => void) => {
  board.forEach((row) => {
    row.forEach((cell) => {
      fn(cell);
    });
  });
};
export const populateWithBombs = (board: Board, bombRatio = 0.2) => {
  forEachCell(board, (cell) => {
    cell.val = Math.random() < bombRatio ? "bomb" : 0;
  });
};

//   export const getNeighbors = (board: Board, cell: Cell): Cell[] => {};

//   export const populateWithNeighborsCount = (board: Board) => {};

//   export const getGameStatus = (
//     board: Board
//   ): "won" | "lost" | "inProgress" => {};

//   export const createBoard = (size, bombRatio) => {};
