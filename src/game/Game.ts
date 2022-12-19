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
        let pieces = [];
        for (let i = 0; i < 32; i++) {
            let value = Math.floor(Math.random() * 6) + 1;
            
            // TODO: Make this more elegant
            let rank = 0;
            if (i > 23) {
                rank = 7;
            } else if (i > 15) {
                rank = 6; 
            } else if (i > 7) {
                rank = 1;
            }
            
            let file = i % 8;
            
            let isPlayer2 = true;
            if (i < 16) isPlayer2 = false;
            
            let newPiece = new Piece(isPlayer2, value, [rank, file]);

            pieces.push(newPiece);
        }
        
        this.gameState = pieces;
        this.gameBoard = new Board(pieces);
        
        return this;
    }

    isLegalMove(): boolean {
        return true;
    }

    isPiecePresent(rank: number, file: number) {
        let out = undefined
        this.gameState.forEach((piece: Piece) => {
          if (piece.getRank() === rank 
            && piece.getFile() === file) {
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
        let out: number[][] = piece.getMoves();

        // Detect for blocks
        let north: number[][] = [];
        let south: number[][] = [];
        let east: number[][] = [];
        let west: number[][] = [];
        let northeast: number[][] = [];
        let southeast: number[][] = [];
        let northwest: number[][] = [];
        let southwest: number[][] = [];

        for (let i = 0; i<value; i++) {
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

        rays.forEach((direction) => {
            let blocked = false;
            direction.forEach((square: number[]) => {
                if (!blocked || !this.isPiecePresent(square[0], square[1])) {
                    
                } else {
                    blocked = true;
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