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

export const cheating = (grid: Board): Board => {
  const gridlength = grid.length;
  let boardCheated: Board = [];
  for (let i = 0; i < gridlength; i++) {
    boardCheated[i] = [];
    for (let j = 0; j < gridlength; j++) {
      boardCheated[i][j] = { x: i, y: j, val: 0, revealed: true };
    }
  }
  return boardCheated;
};

//   export const forEachCell = (board: Board, fn: (cell: Cell) => void) => {};

//   export const getNeighbors = (board: Board, cell: Cell): Cell[] => {};

//   export const populateWithBombs = (board: Board, bombRatio = 0.2) => {};

//   export const populateWithNeighborsCount = (board: Board) => {};

//   export const getGameStatus = (
//     board: Board
//   ): "won" | "lost" | "inProgress" => {};

//   export const createBoard = (size, bombRatio) => {};
