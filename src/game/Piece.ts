export default class Piece {
    isPlayer2: boolean;
    value: number;
    position: Array<number>;

    constructor(isPlayer2:boolean, value: number, position: Array<number>) {
        this.isPlayer2 = isPlayer2;
        this.value = value; 
        this.position = position;
    }

    /* Change the value to something else */
    setValue(toValue: number) {
        /** The rules are that the die may only be flipped
         * to an adjacent side, thus the sum of the original
         * value and the new value must not equal 7.
         */
        if ( toValue > 7 || toValue < 1 || 7 - this.value === 0 ) {
            console.error(`Unable to set value -> ${toValue}: Illegal Value`);
            return this.value;
        } else {
            this.value = toValue;
            return toValue;
        }
    }

    getValue(): number {
        return this.value;
    }

    getPlayer(): number {
        if (this.isPlayer2) return 2;
        else return 1
    }

    getPosition(): number[] {
        return this.position;    
    }

    setPosition(toX: number, toY: number): number[] {
        return this.position = [toX, toY];
    }

    getRank() {
        return this.position[0];
    }

    getFile() {
        return this.position[1];
    }

    getMoves() {
        // Given its value and position, determine all the possible squares this piece can move to.
        const position = this.getPosition();
        const value = this.getValue();
        const rank = position[0];
        const file = position[1];

        let out: number[][] = [];
        if (rank + value < 8 ) out.push([rank + value, file]); // North
        if (rank - value > 0 ) out.push([rank - value, file]); // South
        if (file + value < 8 ) out.push([rank, file + value]); // East
        if (file - value > 0 )out.push([rank, file - value]); // West
        if (rank + value < 8 && file + value < 8 ) out.push([rank + value, file + value]); // NE
        if (rank + value < 8 && file - value > 0 ) out.push([rank + value, file - value]); // SE
        if (rank - value > 0 && file + value < 8 ) out.push([rank - value, file + value]); // NW
        if (rank - value > 0 && file - value > 0 ) out.push([rank - value, file - value]); // SW

        return out;
    }

}