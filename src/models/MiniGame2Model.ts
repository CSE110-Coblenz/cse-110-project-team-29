import type { value, result } from '../types';

export class MiniGame2Model {
    
    private probabilityList: number[] = [
        1,2,3,4,5,6,7,8,9,10,
        11,12,13,14,15,16,17,18,19,20,
        21,22,23,24,25,26,27,28,29,30,
        31,32,33,34,35,36,37,38
    ];

    private colorList: ('Red' | 'Black' | 'Green')[] = ['Red', 'Black', 'Green'];
    private conditionsList: string[] = [
        'Even', 'Odd', 'Greater than 19', 'Less than 19', 'Red', 'Black', 'Green'
    ];



    // TODO
    // get a random number condition
    public getCondition(): string {
        return this.conditionsList[Math.floor(Math.random() * this.conditionsList.length)]!;
         
    }

    constructor() {}

    // spins the roulette and determines the outcome
    public spin(condition: string, bet: number): result {
        const slot = this.calculateValue();
        return this.determineOutcome(condition, slot, bet);
    }

    // TODO: tweak logic 
    //randomly generates a slot value
    public calculateValue(): value {
        const probability = Math.ceil(Math.random() * this.probabilityList.length);
        if (probability <= 18){
            console.log(`Probability: ${probability} Color: ${this.colorList[0]}`);
            return {number: probability, color: this.colorList[0]!};
        }
        else if (probability <= 36 && probability > 18) {
            console.log(`Probability: ${probability} Color: ${this.colorList[1]}`);
            return {number: probability, color: this.colorList[1]!}
        }
        else if (probability > 36) {
            console.log(`Probability: ${probability} Color: ${this.colorList[2]}`);
            return {number: probability, color: this.colorList[2]!}
        }
    
        // return a valid color as a safe fallback
        return {number: -1, color: this.colorList[0]!};
    }

    // checks which num condition was given and if it was met
    public checkCondition(condition: string, slot: value): boolean {
        if (condition == 'Even') {
            console.log("Even ", slot.number);
            return slot.number % 2 == 0;
        }
        else if (condition == 'Odd') {
            console.log("Odd ", slot.number);
            return slot.number % 2 != 0;
        }
        else if (condition == 'Greater than 19') {
            console.log("Greater than 19 ", slot.number);
            return slot.number > 19;
        }
        else if (condition == 'Less than 19') {
            console.log("Less than 19 ", slot.number);
            return slot.number < 19;
        }
        else if (condition == 'Red') {
            return slot.color == 'Red';
        }
        else if (condition == 'Black') {
            return slot.color == 'Black';
        }
        else if (condition == 'Green') {
            return slot.color == 'Green';
        }
        return false;
    }

    // determines win or loss based on conditions and slot outcome
    public determineOutcome(condition: string, slot: value, bet: number): result {

        // checks number condition
        const outcome = this.checkCondition(condition, slot);
        if (outcome) {
            console.log("Win!");
            return {payout: 2 * bet, won: true};
        }
        return {payout: 0, won: false};
    }

}