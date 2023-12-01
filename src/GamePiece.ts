export default class GamePiece {
    value: number
    
    constructor() {
        this.value = getRandomInt(1,6);
    }

    getValue() {
        return this.value;
    }
}

function getRandomInt(min: number, max: number) {
    min = Math.ceil (min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}