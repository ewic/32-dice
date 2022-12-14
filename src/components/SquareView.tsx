import PieceView from "./PieceView"

export default function SquareView({ black: dark, x, y, piece }: any) {
  const fill = dark ? 'black' : 'white'
  const stroke = dark ? 'white' : 'black'

  return (
    <div
      style={{
        backgroundColor: fill,
        color: stroke,
        width: '12.5%',
        height: '12.5%',
      }}
      onClick={() => handleSquareClick(x, y)}
    >
      <PieceView piece={piece} /> 
    </div>
  )
}

// Converts the simple integers x and y to chess coordinates
function getCoordinate(x: number, y: number) {
  return (intToAlpha(x) + "" + (y + 1))
}

function handleSquareClick(x: number, y: number) {
  console.log(getCoordinate(x, y));
}

function intToAlpha(val: number) {
  return (val + 10).toString(36);
}