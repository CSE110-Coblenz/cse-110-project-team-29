export function randIntBetween(min: number, max: number): number {
    return Math.floor((Math.random() * (max - min + 1)) + min) //gives a number between min and max inclusive.
}

export function plusOrMinusInt(num: number) {
    return randIntBetween(-num, num); //gives a number between -num and num inclusive
}

export function tripletsEqual(a1: number, a2: number, a3: number, b1: number, b2: number, b3: number): boolean {
    let tripA = [a1, a2, a3].sort((x, y) => x - y);
    let tripB = [b1, b2, b3].sort((x, y) => x - y);
  
    return tripA[0] === tripB[0] && tripA[1] === tripB[1] && tripA[2] === tripB[2];
}

