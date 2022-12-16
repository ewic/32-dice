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

    getValue() {
        return this.value;
    }

    getPlayer() {
        if (this.isPlayer2) return 2;
        else return 1
    }

    getPosition() {
        return this.position;    
    }

    setPosition(toX: number, toY: number) {
        this.position = [toX, toY];
    }

    getRow() {
        return this.position[0];
    }

    getCol() {
        return this.position[1];
    }

}