import Piece from './components/Piece';

let knightPosition: Array<number> = [0,0];
let observer: any = null;

export default class Game {
    constructor() {

    }
}

function emitChange() {
    observer(knightPosition);
}

export function observe(o: any) {
    if (observer) {
        throw new Error ('Multiple observers are not implemented');
    }

    observer = o;

    emitChange();
}

export function moveKnight(toX: number, toY: number) {
    knightPosition = [toX, toY]
    console.log(toX, toY);
    emitChange();
}

export function canMoveKnight(toX: number, toY: number) {
    const [ x, y ] = knightPosition;
    const dx = toX - x;
    const dy = toY - y;

    return (
        (Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
        (Math.abs(dx) === 1 && Math.abs(dy) === 2)
    );
}

export function getSelectedPiece() {
    // return selectedPiece;
}