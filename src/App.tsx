import { useEffect, useState } from "react";
import { Cell, createBoard, getGameStatus } from "./Board";

const BOARD_SIZE = 5;

function App() {
  const [board, setBoard] = useState(createBoard(BOARD_SIZE));
  const [boardIsRevealed, setBoardIsRevealed] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const reload = () => {
    setBoard(createBoard(BOARD_SIZE));
    setIsFinished(false);
    setBoardIsRevealed(false)
  };

  const revealCell = (cell: Cell) => {
    let newBoard = [...board];
    newBoard[cell.x][cell.y].revealed = true;
    setBoard(newBoard);
  }

  useEffect(() => {
    const status = getGameStatus(board)
    if (status === "won") {
      setIsFinished(true)
      setBoardIsRevealed(true)
    } else if (status === "lost") {
      setIsFinished(true)
      setBoardIsRevealed(true)
    } else {
      setIsFinished(false)
    }
  },[board])

  return (
    <div className="App">
      <div>
        <button
          disabled={isFinished}
          onClick={() => setBoardIsRevealed(!boardIsRevealed)}
        >
          {boardIsRevealed ? "Stop cheating" : "Cheat"}
        </button>
        <button
          style={{ backgroundColor: isFinished ? "orange" : "" }}
          onClick={reload}
        >
          Reload
        </button>
        <table style={{ opacity: isFinished ? 0.7 : 1 }}>
          <tbody>
            {board.map((row, rowIndex) => {
              return (
                <tr key={rowIndex}>
                  {row.map((cell) => (
                    <td
                      style={{
                        backgroundColor: "",
                      }}
                      key={cell.y}
                      onClick={() => {revealCell(cell)}}
                    >
                      {(cell.revealed || boardIsRevealed) &&
                        (cell.val === "bomb" ? "💣" : cell.val)}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
