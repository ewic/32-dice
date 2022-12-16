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
            let px = 0;
            if (i > 23) {
                px = 7;
            } else if (i > 15) {
                px = 6; 
            } else if (i > 7) {
                px = 1;
            }
            
            let py = i % 8;
            
            let isBlack = false;
            if (i < 8) isBlack = true;
            
            let newPiece = new Piece(isBlack, value, [px, py]);

            pieces.push(newPiece);
        }
        
        this.gameState = pieces;
        this.gameBoard = new Board(pieces);
        
        return this;
    }

    getGameState() {
        return this.gameState;
    }

    selectPiece(piece: Piece) {
        this.selectedPiece = piece;
        return piece;
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