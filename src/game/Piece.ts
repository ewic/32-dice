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

}