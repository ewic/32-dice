export default class Piece {
    isBlack: boolean;
    value: number;
    position: Array<number>;

    constructor(isBlack:boolean, value: number, position: Array<number>) {
        this.isBlack = isBlack;
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

    getColor() {
        if (this.isBlack) return `black`;
        else return `white`
    }

    getPosition() {
        return this.position;    
    }

    getRow() {
        return this.position[0];
    }

    getCol() {
        return this.position[1];
    }

}