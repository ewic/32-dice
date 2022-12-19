import { validateHeaderValue } from "http";
import { forEachChild, OutputFileType } from "typescript";
import { Board } from "./Board";
import Piece from "./Piece";

let observer: any = null;

export default class Game {
    gameBoard: Board = new Board();
    gameState: Array<Piece> = [];
    selectedPiece?: Piece;
    
    constructor() {
        this.createNewGame();
    }

    createNewGame() {
        // Generate a new gameState
        //   A gameState is an array of pieces and coordinates (subject to change)
        let pieces: Array<Piece> = [];
        for (let i = 0; i < 32; i++) {
            // Randomly determine the value, between 1 and 6.
            let value = Math.floor(Math.random() * 6) + 1;
            
            // Split the pieces, 8 pieces on rank 0, 8 on rank 1, 8 on rank 6 and 8 on rank 7
            let rank = 0;
            if (i > 23) { rank = 7; } 
            else if (i > 15) { rank = 6; } 
            else if (i > 7) { rank = 1; }

            let file = i % 8;
    
            // First half of the pieces are player1, second half are player2
            let isPlayer2 = true;
            if (i < 16) isPlayer2 = false;
            
            pieces.push(new Piece(isPlayer2, value, [rank, file]));
        }
        
        pieces.push(new Piece(false, 2, [5,7]))
        pieces.push(new Piece(false, 3, [5,5]))
        pieces.push(new Piece(true, 2, [5,2]))

        this.gameState = pieces;
        this.gameBoard = new Board(pieces);
        
        return this;
    }

    isLegalMove(): boolean {
        return true;
    }

    capturePiece() {
        
    }

    isPiecePresent(square: number[]) {
        let out = undefined
        this.gameState.forEach((piece: Piece) => {
          if (piece.getRank() === square[0]
            && piece.getFile() === square[1]) {
              out = piece;
          } 
        });
        return out;
    }

    getGameState() {
        return this.gameState;
    }

    setSelectedPiece(piece: Piece) {
        this.selectedPiece = piece;
    }

    movePiece(rank: number, file: number) {
        this.selectedPiece?.setPosition(rank, file);
    }

    getLegalMoves(): number[][] {
        if (this.selectedPiece === undefined) return [];

        const piece = this.selectedPiece;
        const rank = piece.getRank();
        const file = piece.getFile();
        const value = piece.getValue();
        let out: number[][] = [];

        // Determine all legal moves

        // If the move falls out of the bounds of the board, then do not add it.
        out.push([rank + value, file]); // North
        out.push([rank - value, file]); // South
        out.push([rank, file + value]); // East
        out.push([rank, file - value]); // West
        out.push([rank + value, file + value]); // NE
        out.push([rank + value, file - value]); // SE
        out.push([rank - value, file + value]); // NW
        out.push([rank - value, file - value]); // SW

        // Detect for blocks
        let north: number[][] = [];
        let south: number[][] = [];
        let east: number[][] = [];
        let west: number[][] = [];
        let northeast: number[][] = [];
        let southeast: number[][] = [];
        let northwest: number[][] = [];
        let southwest: number[][] = [];

        // Generate the squares to test.
        for (let i = 1; i<=value; i++) {
            north.push([rank+i, file])
            south.push([rank-i, file])
            east.push([rank, file+i])
            west.push([rank, file-i])
            northeast.push([rank+i, file+i])
            southeast.push([rank-i, file+i])
            northwest.push([rank+i, file-i])
            southwest.push([rank-i, file-i])
        }

        let rays = [north, south, east, west, northeast, southeast, northeast, southwest]

        rays.forEach((direction, index) => {
            direction.forEach((square: number[]) => {
                // A collision occurs if a piece is encountered while scanning the ray.
                if (this.isPiecePresent(square) && piece.getPlayer() === this.selectedPiece?.getPlayer()) {
                    out[index] = [];
                }
            })
        })

        return out;
    }

}

function emitChange() {
    observer();
}

export function observe(o: any) {
    if (observer) {
        throw new Error ('Multiple observers are not implemented');
    }

    observer = o;
    emitChange();
}

export function getSelectedPiece() {
    // return selectedPiece;
}