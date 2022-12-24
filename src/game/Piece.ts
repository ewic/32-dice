export default class Piece {
    isPlayer2: boolean;
    value: number;
    position: number[];

    constructor(isPlayer2:boolean, value: number, position: number[]) {
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

    getPossibleValuesToChangeTo(): number[] {
        let choices = [];
        // Remove 2 choices: the current value of the piece and 7 minus the current value.
        for ( let i = 1; i < 7; i++ ) {
            if ( i !== this.value && i !== (7 - this.value ) ) {
                choices.push(i);   
            }
        }
        return choices;
    }

    getPlayer(): number {
        if (this.isPlayer2) return 2;
        else return 1
    }

    getPosition(): number[] {
        return this.position;    
    }

    setPosition(square: number[]): number[] {
        return this.position = [square[0], square[1]];
    }

    getRank() {
        return this.position[0];
    }

    getFile() {
        return this.position[1];
    }

}