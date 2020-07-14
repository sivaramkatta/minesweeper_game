import React, { useEffect, useState } from "react";
import { boardSetup, isBomb, isZeroTile, gameEnded } from "./logic";
import { boardSize, levels } from "./constants";

const Tile = ({ tile: { value, open, flagged, wrongFlagged } }) => {
  let text;
  if (wrongFlagged) {
    text = <p style={styles.redText}>X</p>;
  } else if (flagged) {
    text = <p style={styles.greenText}>F</p>;
  } else if (value === -1) {
    text = <p style={styles.redText}>B</p>;
  } else {
    text = <p style={styles.tileText}>{value}</p>;
  }
  return <div style={styles.tileDiv}>{(open || flagged) && text}</div>;
};

function App() {
  const [board, setBoard] = useState(null);
  const [mode, setMode] = useState("B");
  const [gameover, setGameover] = useState(false);
  const [won, setWon] = useState(false);

  useEffect(() => {
    setupGame();
  }, []);

  const setupGame = () => {
    setBoard(null);
    setMode("B");
    setGameover(false);
    setWon(false);
    let difficulty = prompt("select difficulty level easy, medium, hard") || "";
    difficulty = levels.includes(difficulty.toUpperCase())
      ? difficulty.toUpperCase()
      : "EASY";
    setBoard(boardSetup(boardSize[difficulty], difficulty));
  };

  const openRecursive = (r, c) => {
    if (board[r][c].value === 0) {
      let neighbours = [
        [r - 1, c - 1],
        [r - 1, c],
        [r - 1, c + 1],
        [r, c - 1],
        [r, c + 1],
        [r + 1, c - 1],
        [r + 1, c],
        [r + 1, c + 1]
      ];
      for (let i = 0; i < neighbours.length; i++) {
        if (
          board[neighbours[i][0]] &&
          board[neighbours[i][0]][neighbours[i][1]] &&
          !board[neighbours[i][0]][neighbours[i][1]].open
        ) {
          board[neighbours[i][0]][neighbours[i][1]].open = true;
          if (isZeroTile(neighbours[i][0], neighbours[i][1], board)) {
            openRecursive(neighbours[i][0], neighbours[i][1]);
          }
        }
      }
    }
  };

  const handleClick = (row, column) => {
    if (!board[row][column].open && !gameover && !won) {
      if (mode === "B" && !board[row][column].flagged) {
        board[row][column].open = true;
        setBoard([...board]);
        if (isBomb(row, column, board)) {
          for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
              board[i][j].open = true;
              if (board[i][j].value >= 0 && board[i][j].flagged === true) {
                board[i][j].wrongFlagged = true;
              }
            }
          }
          setBoard([...board]);
          setGameover(true);
          return;
        } else {
          openRecursive(row, column);
        }
      } else if (mode === "F") {
        board[row][column].flagged = !board[row][column].flagged;
        setBoard([...board]);
      }
      const isGameEnded = gameEnded(board);
      let wrongly_flagged = false;
      if (isGameEnded) {
        for (let i = 0; i < board.length; i++) {
          for (let j = 0; j < board[i].length; j++) {
            if (board[i][j].value >= 0 && board[i][j].flagged === true) {
              wrongly_flagged = true;
              board[i][j].wrongFlagged = true;
            }
          }
        }
        if (wrongly_flagged) {
          setGameover(true);
        } else {
          setWon(true);
        }
      }
    }
  };

  if (!board) {
    return <h2 style={{ color: "white", textAlign: "center" }}>Loading...</h2>;
  } else {
    return (
      <div>
        <h1 style={styles.heading}>Minesweeper</h1>
        <div style={styles.buttonsDiv}>
          <div style={styles.buttonDiv} onClick={setupGame}>
            <p style={styles.buttonText}>New Game</p>
          </div>
        </div>
        <div style={styles.boardContainer}>
          {board.map((row, row_index) => (
            <div key={row_index}>
              {row.map((column, column_index) => (
                <div
                  key={column_index}
                  onClick={() => {
                    handleClick(column_index, row_index);
                  }}
                >
                  <Tile tile={board[column_index][row_index]} />
                </div>
              ))}
              <br />
            </div>
          ))}
        </div>
        <div style={styles.modeContainer}>
          <div>
            <p style={styles.modeText}>Selected Mode:</p>
          </div>
          <div
            style={styles.modeButton}
            onClick={() => {
              setMode(prev => (prev === "B" ? "F" : "B"));
            }}
          >
            <p style={styles.buttonText}>{mode === "B" ? "Bomb" : "Flag"}</p>
          </div>
        </div>
        {gameover && <h1 style={styles.lostText}>You Lost</h1>}
        {won && <h1 style={styles.wonText}>You Won</h1>}
        <div>
          <p style={styles.indexKey}>Mine : </p>
          <p style={styles.indexValueB}>B</p>
        </div>
        <div>
          <p style={styles.indexKey}>Flagged : </p>
          <p style={styles.indexValueF}>F</p>
        </div>
        <div>
          <p style={styles.indexKey}>Wrongly Flagged : </p>
          <p style={styles.indexValueB}>X</p>
        </div>
      </div>
    );
  }
}

const styles = {
  wonText: {
    color: "green",
    textAlign: "center"
  },
  lostText: {
    color: "red",
    textAlign: "center"
  },
  redText: {
    textAlign: "center",
    color: "red",
    margin: 11
  },
  greenText: {
    textAlign: "center",
    color: "green",
    margin: 11
  },
  tileText: {
    textAlign: "center",
    margin: 11
  },
  tileDiv: {
    height: 40,
    width: 40,
    backgroundColor: "white",
    border: "1px solid black"
  },
  heading: {
    color: "white",
    textAlign: "center",
    marginBottom: 20
  },
  buttonsDiv: {
    margin: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  },
  buttonDiv: {
    padding: "1px 6px 1px 6px",
    backgroundColor: "green",
    width: 85,
    height: 30,
    borderRadius: 5,
    marginRight: 12
  },
  buttonText: {
    color: "white",
    padding: 0,
    margin: 0,
    marginTop: 5
  },
  boardContainer: {
    display: "flex",
    flex: 1,
    width: "fit-content",
    margin: "0 auto"
  },
  modeContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  },
  modeText: {
    color: "white",
    margin: 0,
    marginTop: 5,
    marginRight: 8
  },
  modeButton: {
    padding: "1px 6px 1px 6px",
    backgroundColor: "green",
    width: 45,
    height: 30,
    borderRadius: 5
  },
  indexValueB: {
    color: "red",
    margin: 0,
    display: "inline"
  },
  indexKey: {
    color: "white",
    margin: 0,
    display: "inline"
  },
  indexValueF: {
    color: "green",
    margin: 0,
    display: "inline"
  }
};

export default App;
