import { useState } from 'react';
import Piece from '../game/Piece';

import styles from "./styles.module.css";

export default function BoardView({ game }: any) {
  const [playerPerspective, setPlayerPerspective] = useState<Number>(1);
  const [size, setSize] = useState(600);
  const [activePlayer, setActivePlayer] = useState<Number>(1);
  const [selectedPiece, setSelectedPiece] = useState<Piece>();
  const [capturedPieces, setCapturedPieces] = useState<Array<Piece>>([]);

  const changeTurn = () => {
    if (activePlayer === 1) setActivePlayer(2)
    else setActivePlayer(1);
    setSelectedPiece(undefined);
  }

  const handleClick = (row: number, col: number, piece?: Piece) => {
    console.log("Click: " + getCoordinate(row, col));

    // If a piece is in the selected square
    if (piece) {
      // console.log("Piece is present!")
      if (selectedPiece === undefined) {
        // console.log("No current selected piece");
        if (piece.getPlayer() === activePlayer) {
          // console.log("piece player is active player")
          setSelectedPiece(piece);
        } 
      }
    } else {
      // TODO: if this square is a legal move for the selectedPiece to move to, then do the move.
      if (selectedPiece != null) {
        selectedPiece.setPosition(row, col);
        changeTurn();
      } else {
        setSelectedPiece(undefined);
      }
    }

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
    if ( playerPerspective === 1) setPlayerPerspective(2)
    else setPlayerPerspective(1);
  }

  // Rendering Functions

  const renderSquare = (x: number, y: number, piece?: Piece) => {
    let light = (x + y) % 2 === 0;

    let fill = light ? 'lavender' : 'mediumPurple'
    const stroke = light ? 'thistle' : 'lavender'
    
    if (piece === selectedPiece && selectedPiece !== undefined) {
      fill = 'linen';
    }
  
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
        {piece != null && 
          <div 
            className={styles.piece}
            style={{
              width: "30px",
              height: "30px",
              backgroundColor: piece.getPlayer() === 1 ? 'white' : 'black',
              color: piece.getPlayer() === 1 ? 'black' : 'white',
              border: "2px solid " + piece.getPlayer()
            }}
          >
            {piece.getValue()}
          </div>
        }
      </div>
    )
  }

  const renderBoard = () => {
    // let rows = boardState;
    let rows = [];

    // Render all the squares
    for (let row = 0; row < 8; row++) {
      let boardRow = [];
      for (let col = 0; col < 8; col++) {
        let piece = isPiecePresent(row, col);
        boardRow.push(renderSquare(row, col, piece));
      }
      rows.push(boardRow);
    }

    if (playerPerspective === 2) {
      rows.reverse();
    } else {
      rows = rows.map(row => {
        return row.reverse();
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
        <span>Perspective: Player {String(playerPerspective)}</span>
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

