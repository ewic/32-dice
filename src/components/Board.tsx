import Square from './Square'
import Knight from './Knight'
import Piece from './Piece';

import { getSelectedPiece } from '../Game';

export default function Board({ knightPosition }: any) {
  const squares = [];
  for (let i = 0; i < 64; i++) {
    squares.push(renderSquare(i, knightPosition));
  }

  return (
    <div
        style={{
            width: '600px',
            height: '600px',
            display: 'flex',
            flexWrap: 'wrap',
            border: '2px solid black'
        }}
    >
        {squares}
    </div>
  )
}

function renderSquare(i: number, pieces: Array<any>) {
    const x = i % 8;
    const y = Math.floor(i/8);
    const black = (x + y) % 2 === 1;

    const isPieceHere = true;

    const piece = isPieceHere ? <Piece /> : null;

    return (
        <div onClick={() => handleSquareClick(x, y)} key={i} style={{ width: '12.5%', height: '12.5%' }}>
          <Square black={black}>{piece}</Square>
        </div>
      )
}

function handleSquareClick(toX: number, toY: number) {
    // If there is no piece here, select the piece

    // If there is a selected piece and this square is a legal move,
    //   Move the seleceted piece here.

    // If the selected piece is selectable, select it.
}