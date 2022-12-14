import { useState } from 'react';
import SquareView from './SquareView'
import Piece from '../game/Piece';

export default function BoardView({ gameState }: any) {
  const [size, setSize] = useState(600);

  var rows = [];
  for (let row = 0; row < 8; row++) {
    let boardRow = [];
    for (let col = 0; col < 8; col++) {
      let isDark = (row + col) % 2 === 0;
      let piece = isPiecePresent(row, col, gameState);

      boardRow.push(<SquareView 
        black={isDark} 
        x={col} 
        y={row} 
        piece={piece} 
        key={col+row} />);
    }
    rows.push(boardRow);
  }

  // Boards are coordinated with a1 in the bottom left corner
  //   So by default we shoudl flip the board
  // TODO: Implement a flip feature
  rows = rows.reverse();

  return (
    <div 
        style={{
            width: size + 'px',
            height: size + 'px',
            display: 'flex',
            flexWrap: 'wrap',
            border: '2px solid black'
        }}
    >
        {rows}
    </div>
  )
}

function isPiecePresent(row: number, col: number, gameState: Array<Piece>) {
  let out = null;
  
  gameState.forEach(piece => {
    if (piece.getRow() === row 
      && piece.getCol() === col) {
        out = piece;
    } 
  })

  return out;
}