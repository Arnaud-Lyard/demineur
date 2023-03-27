export interface Cell {
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

export const getNeighbors = (board: Board, cell: Cell): Cell[] => {
  const neighbors = [];
  if(cell.y !== 0) neighbors.push(board[cell.x][cell.y - 1]);
  if(cell.y !== 0 && cell.x !== board.length - 1) neighbors.push(board[cell.x + 1][cell.y - 1]);
  if(cell.x !== board.length - 1) neighbors.push(board[cell.x + 1][cell.y]);
  if(cell.x !== board.length - 1 && cell.y !== board.length - 1) neighbors.push(board[cell.x + 1][cell.y + 1]);
  if(cell.y !== board.length - 1) neighbors.push(board[cell.x][cell.y + 1]);
  if(cell.y !== board.length - 1 && cell.x !== 0) neighbors.push(board[cell.x - 1][cell.y + 1]);
  if(cell.x !== 0) neighbors.push(board[cell.x - 1][cell.y]);
  if(cell.x !== 0 && cell.y !== 0) neighbors.push(board[cell.x - 1][cell.y - 1]);

  return neighbors;
};

export const populateWithNeighborsCount = (board: Board) => {
  forEachCell(board, (cell) => {
    if (cell.val !== "bomb") {
      cell.val = getNeighbors(board, cell).filter((cell) => cell.val === "bomb").length
    }
  });
};

export const getGameStatus = (
  board: Board
): "won" | "lost" | "inProgress" => {
  let lost = false;
  let won = true;
  forEachCell(board, (cell) => {
    if (cell.val === "bomb" && cell.revealed) {
      lost = true;
    }
    if (cell.val !== "bomb" && !cell.revealed) {
      won = false;
    }
  });
  if (lost) {
    return "lost";
  }
  if (won) {
    return "won";
  }
  return "inProgress";
};

export const createBoard = (size = 5, bombRatio = 0.2) => {
  const b = createEmptyBoard(size);
  populateWithBombs(b, bombRatio);
  populateWithNeighborsCount(b);
  return b;
};
