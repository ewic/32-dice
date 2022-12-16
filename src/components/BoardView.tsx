import { useState } from 'react';
import Piece from '../game/Piece';

import styles from "./styles.module.css";

export default function BoardView({ game }: any) {
  const [playerPerspective, setPlayerPerspective] = useState('white');
  const [size, setSize] = useState(600);

  const handleClick = (row: number, col: number, piece?: Piece) => {
    console.group("Click event!");
    console.log(getCoordinate(row, col));
    if (piece) console.log("Piece is present")
    else console.log("Piece is not present");
    console.groupEnd();
  }

  // Game logic
  function isPiecePresent(row: number, col: number) {
    let out = undefined
    game.getGameState().forEach((piece: Piece) => {
      if (piece.getRow() === row 
        && piece.getCol() === col) {
          out = piece;
      } 
    })
    return out;
  }

  // UI Elements
  const increaseSize = () => {
    if (size < 1000) setSize(size + 50);
  }

  const decreaseSize = () => {
    if (size > 400) setSize(size - 50);
  }

  const resetSize = () => {
    setSize(600);
  }

  const flipBoard = () => {
    if ( playerPerspective === 'white') setPlayerPerspective('black')
    else setPlayerPerspective('white');
  }

  // Rendering Functions

  const renderSquare = (x: number, y: number, piece?: Piece) => {
    let dark = (x + y) % 2 === 0;
  
    const fill = dark ? 'black' : 'white'
    const stroke = dark ? 'white' : 'black'
  
    return (
      <div
        key={x+y}
        onClick={() => handleClick(x, y, piece)}
        className={styles.square}
        style={{
          backgroundColor: fill,
          color: stroke,
        }}
      >
        <div className="piece">
          <span>{piece != null ? piece.getValue() : null}</span>
        </div>
      </div>
    )
  }

  const renderCoordinateSquare = (contents?: string) => {
    return(
      <div 
        key={"coordinate-"+contents}
        className={styles.coordinate_square}
      >
        <span>{contents}</span>
      </div>
    )
  }

  const renderBoard = () => {
    // let rows = boardState;
    let rows = [];

    // Attach the first row, which is just coordinates
    let coordinateRow = [];
    // Push an empty square for the first coordinate column.
    coordinateRow.push(renderCoordinateSquare());
    // 
    for (let col = 0; col < 8; col++) {
      coordinateRow.push(renderCoordinateSquare(intToAlpha(col)))
    }
    // Push another empty square for the last coordinate column.
    coordinateRow.push(renderCoordinateSquare());

    // Push the first row, which is a coordinate row.
    rows.push(coordinateRow);
    // Render all the squares
    for (let row = 0; row < 8; row++) {
      let boardRow = [];
      boardRow.push(renderCoordinateSquare(String(row+1)));
      for (let col = 0; col < 8; col++) {
        let piece = isPiecePresent(row, col);
  
        boardRow.push(renderSquare(row, col, piece));
      }
      boardRow.push(renderCoordinateSquare(String(row+1)));
      rows.push(boardRow);
    }
    // Push the last coordinate row.
    rows.push(coordinateRow);

    if (playerPerspective === 'white') {
      rows.reverse();
      rows.forEach(row => {
        row.reverse();
      })
    }

    return rows;
  }

  return(
    <div className="main">
      <div className="userinterface">
        <button onClick={() => increaseSize()}>+</button>
        <button onClick={() => resetSize()}>&#8634;</button>
        <button onClick={() => decreaseSize()}>-</button>
        <br />
        <span>Perspective: {playerPerspective}</span>
        <button onClick={() => flipBoard()}>Flip</button>
      </div>
      <div className={styles.board}
        style={{
          width: size + 'px',
          height: size + 'px'
        }}>
      {renderBoard()}
      </div>
    </div>
  )
}

// Converts the simple integers x and y to chess coordinates
function getCoordinate(x: number, y: number) {
  return (intToAlpha(x) + "" + (y + 1))
}

function intToAlpha(val: number) {
  return (val + 10).toString(36);
}

