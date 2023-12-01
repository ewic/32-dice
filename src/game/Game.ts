import { Board } from "./Board";
import Piece from "./Piece";


interface GameState {
    pieces: Array<Piece>,
    activePlayer: number // Either 1 or 2
}

export default class Game {
    gameBoard: Board = new Board();
    gameState: GameState = {
        pieces: [],
        activePlayer: 1
    };
    history: any[] = [];
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

        // pieces.push(new Piece(false, 1, [7,7]));
        // pieces.push(new Piece(false, 1, [7,1]));
        // pieces.push(new Piece(true, 1, [1,0]));
        // pieces.push(new Piece(true, 1, [0,0]));
        
        this.gameState.pieces = pieces;
        this.gameBoard = new Board(pieces);
        
        return this;
    }

    isLegalMove(): boolean {
        return true;
    }

    capturePiece(capturedPiece: Piece) {
        let pieces = this.gameState.pieces;
        // Remove the piece from the set of pieces
        pieces.forEach((piece: Piece, index: number) => {
            if (piece === capturedPiece) {
                pieces.splice(index, 1);
            }
        });
    }

    getPiece(square: number[]): Piece | undefined {
        const pieces = this.gameState.pieces;
        let out = undefined;

        pieces.forEach((piece: Piece) => {
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

    getActivePlayer(): number {
        return this.gameState.activePlayer;
    }

    toggleActivePlayer() {
        if (this.gameState.activePlayer === 1) this.gameState.activePlayer = 2;
        else this.gameState.activePlayer = 1;
    }

    setActivePlayer(player: number): number | void {
        if (player === 1 || player === 2) {
            this.gameState.activePlayer = player;
            return player;
        } else return;
    }

    setSelectedPiece(piece: Piece): Piece {
        this.selectedPiece = piece;
        return piece;
    }

    movePiece(square: number[]) {
        this.selectedPiece?.setPosition(square);
    }

    isCheckmate(): boolean {
        const activePlayer = this.gameState.activePlayer
        // Determine the rank to test
        // If p1 is active, rank = 7, else rank = 0
        const testRank = activePlayer === 1 ? 7 : 0; 
        const position = this.selectedPiece?.getPosition()

        if (position && position[0] !== testRank) {
            console.log("Didn't move to back rank");
            return false;
        } 

        // If we did move to the back rank, test to see if we can be captured
        if (activePlayer === 1) {
            // rays to test are east west south se sw
        }

        return false;
    }

    getLegalMoves(): number[][] {
        if (this.selectedPiece === undefined) return [];

        const rank = this.selectedPiece.getRank();
        const file = this.selectedPiece.getFile();
        const value = this.selectedPiece.getValue();
        let out: number[][] = [];

        // Determine all legal moves

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
            north.push([rank + i, file])
            south.push([rank - i, file])
            east.push([rank, file + i])
            west.push([rank, file - i])
            northeast.push([rank + i, file + i])
            southeast.push([rank - i, file + i])
            northwest.push([rank + i, file - i])
            southwest.push([rank - i, file - i])
        }

        let rays = [north, south, east, west, northeast, southeast, northwest, southwest]

        rays.forEach((ray) => {
            let blocked = false;
            // Test each ray to determine if it is blocked.
            for (let i = 0; i < value; i++) {
                let piece = this.getPiece(ray[i]);
                // If we encounter a piece...
                if (piece) {
                    // If we are at the end of the ray, determine if the piece is of the opposing player, then it can be captured.
                    if (i === value - 1) {
                        if (piece.getPlayer() === this.selectedPiece?.getPlayer()) {
                            blocked = true;
                            break;
                        } 
                    } else {
                        blocked = true;
                        break;
                    }
                }
            }
            // If we do not encounter a piece or we only encountered a piece of the opposing player
            //   on the last square in the ray, then we are not blocked.
            if (!blocked) {
                out.push(ray[ray.length - 1]);
            }
        });

        return out;
    }

}