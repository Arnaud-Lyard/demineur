import React, { useEffect, useState } from "react";
import { Board, cheating, createEmptyBoard } from "./Board";

const BOARD_SIZE = 5;

function App() {
  const [board, setBoard] = useState<Board>(createEmptyBoard(BOARD_SIZE));
  const [boardIsRevealed, setBoardIsRevealed] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const reload = () => {
    setBoard(createEmptyBoard(BOARD_SIZE));
    setIsFinished(false);
  };

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
                      onClick={() => {}}
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
