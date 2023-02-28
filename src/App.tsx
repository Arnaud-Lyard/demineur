import React, { useEffect, useState } from "react";
import { Board, cheating, createEmptyBoard } from "./Board";
function App() {
  const [board, setBoard] = useState<Board>([]);
  useEffect(() => {
    setBoard(createEmptyBoard(5));
  }, []);
  return (
    <div className="App">
      <div>
        <button onClick={() => setBoard(cheating(board))}>Cheating</button>
        <button onClick={() => setBoard(createEmptyBoard(5))}>Reload</button>
        <table>
          <tbody>
            {board.map((row, rowIndex) => {
              return (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => {
                    return (
                      <td key={cellIndex}>{cell.revealed ? cell.val : ""}</td>
                    );
                  })}
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
