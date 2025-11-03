import { useState } from "react";
import "./chess.css";
import { useNavigate } from "react-router-dom";

export default function Chess() {
  const [select, setSelect] = useState([]);

  const chessBoardclick = (row, col) => {
    const newSelected = [];

    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (i - j === row - col || i + j === row + col) {
          newSelected.push(`${i} + ${j}`);
        }
      }
    }
    setSelect(newSelected);
  };

  return (
    <>
      <div className="App">
        <h1>Chess Board</h1>
        <p style={{textAlign: "center"}}>Click on any of the box.....</p>
        <div className="chess-board">
          {[...Array(8)].map((item, row) =>
            [...Array(8)].map((item, col) => {
              let isDark = (row + col) % 2 === 1;
              const isHighLighted = select.includes(`${row} + ${col}`);
              return (
                <div
                  key={`${row} + ${col}`}
                  onClick={() => chessBoardclick(row, col)}
                  className={`chess-box ${isDark ? "dark" : "light"} ${
                    isHighLighted ? "red" : ""
                  }`}
                ></div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}
