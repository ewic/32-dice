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
    game.setSelectedPiece(undefined);
    setSelectedPiece(undefined);
  }

  const isLegalMove = (rank: number, file: number) => {
    const square = [rank, file]
    const legalMoves = game.getLegalMoves();

    let out = false;
    legalMoves.forEach( (testSquare: Array<Number>) => {
      if (square[0] === testSquare[0] && square[1] === testSquare[1]) {
        console.log("Legal Move:", testSquare)
        out = true;
      }
    })

    return out;
  }

  const handleClick = (rank: number, file: number, piece?: Piece) => {
    console.group("Click:" + [rank, file] + "|" + getNotation(rank, file));
    console.log(game.isLegalMove());
    if (selectedPiece && selectedPiece.getPlayer() === activePlayer && !piece && isLegalMove(rank, file)) {
      moveSelectedPiece(rank, file);
    } else if (piece && piece.getPlayer() === activePlayer) {
      selectPiece(piece);
    }
    console.groupEnd()
  }

  const moveSelectedPiece = (rank: number, file: number) => {
    if (selectedPiece) {
      selectedPiece.setPosition(rank, file);
      changeTurn();
    }
  }

  const selectPiece = (piece: Piece) => {
    game.setSelectedPiece(piece);
    setSelectedPiece(piece);
    return piece;
  }

  const isPiecePresent = (rank: number, file: number) => {
    return game.isPiecePresent(rank, file);
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

  const renderSquare = (rank: number, file: number, piece?: Piece) => {
    let light = (rank + file) % 2 === 0;

    let fill = light ? 'lavender' : 'mediumPurple'
    const stroke = light ? 'thistle' : 'lavender'
    
    if (piece === selectedPiece && selectedPiece !== undefined) {
      fill = 'linen';
    }
  
    if ( isLegalMove(rank, file) ) {
      fill = 'darkGray'
    }

    return (
      <div
        key={rank+file}
        onClick={() => handleClick(rank, file, piece)}
        className={styles.square}
        style={{
          backgroundColor: fill,
          color: stroke,
        }}
      >
        {piece && 
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
    for (let rank = 0; rank < 8; rank++) {
      let boardRow = [];
      for (let file = 0; file < 8; file++) {
        let piece = isPiecePresent(rank, file);
        boardRow.push(renderSquare(rank, file, piece));
      }
      rows.push(boardRow);
    }

    if (playerPerspective === 1) {
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
function getNotation(rank: number, file: number) {
  return (intToAlpha(file) + "" + (rank + 1))
}

// Converts an int to a char based on its position in the alphabet
function intToAlpha(val: number) {
  return (val + 10).toString(36);
}