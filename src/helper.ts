export function randIntBetween(min: number, max: number): number {
    return Math.floor((Math.random() * (max - min + 1)) + min) //gives a number between min and max inclusive.
}

export function plusOrMinusInt(num: number) {
    return randIntBetween(-num, num); //gives a number between -num and num inclusive
}

