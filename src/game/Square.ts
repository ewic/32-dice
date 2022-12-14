import Piece from "./Piece";


export default class Square {
    piece?: Piece;
    coordinate: Array<number> = [0,0]

    constructor(coordinate: Array<number>, piece?: Piece) {
        if (piece) {
            this.setPiece(piece);
        }
    }

    getPiece() {
        return this.piece;
    }

    setPiece(piece: Piece) {
        return this.piece = piece;
    }

    getCoordinate() {

    }
}