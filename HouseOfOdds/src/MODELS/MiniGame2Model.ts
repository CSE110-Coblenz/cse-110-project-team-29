import type { value, result, condition } from '../TYPES/value';
export class MiniGame2Model {
    
    private probabilityList: number[] = [
        1,2,3,4,5,6,7,8,9,10,
        11,12,13,14,15,16,17,18,19,20,
        21,22,23,24,25,26,27,28,29,30,
        31,32,33,34,35,36,37,38
    ];

    private colorList: ('Red' | 'Black' | 'Green')[] = ['Red', 'Black', 'Green'];
    private numConditionsList: ('Even' | 'Odd' | 'Greater than 19' | 'Less than 19')[] = [
        'Even', 'Odd', 'Greater than 19', 'Less than 19'
    ];



    // TODO
    // get a random number condition
    public getCondition(): condition {
        const numberCondition = this.numConditionsList[Math.floor(Math.random() * this.numConditionsList.length)];
        const colorCondition = this.colorList[Math.floor(Math.random() * this.colorList.length)];
        return { number: numberCondition, color: colorCondition };
    }

    // threeish conditions





    constructor() {}
    // TODO: throw error if bet is invalid
    // user inputs bet amount
    // color bet (text or button)
    public bet(): number {
        return 1;
    }
    
    public increaseBet(num: number): void {
        
    }

    public decreaseBet(num: number): void {
        
    }

    public resetBet(): void {
        
    }




    
    // spins the roulette and determines the outcome
    public spin(condition: condition, bet: number): result {
        const slot = this.calculateValue();
        return this.determineOutcome(condition, slot, bet);
    }

    // randomly generates a slot value
    public calculateValue(): value {
        const probability = Math.ceil(Math.random() * this.probabilityList.length);
        console.log(`Probability: ${probability}`);
        if (probability <= 18){
            return {number: probability, color: this.colorList[0]};
        }
        else if (probability <= 36 && probability > 18) {
            return {number: probability, color: this.colorList[1]}
        }
        else if (probability > 36) {
            return {number: probability, color: this.colorList[2]}
        }
    
        // return a valid color as a safe fallback
        return {number: -1, color: this.colorList[0]};
    }

    // checks which num condition was given and if it was met
    public checkNumCondition(condition: string, slot: value): boolean {
        if (condition == 'Even') {
            return slot.number % 2 == 0;
        }
        else if (condition == 'Odd') {
            return slot.number % 2 != 0;
        }
        else if (condition == 'Greater than 19') {
            return slot.number > 19;
        }
        else if (condition == 'Less than 19') {
            return slot.number < 19;
        }

        return false;
    }

    // checks which color condition was given and if it was met
    public checkColorCondition(condition: string, slot: value): boolean {
        if (condition == 'Red') {
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
    public determineOutcome(condition: condition, slot: value, bet: number): result {

        // checks number condition
        const numOutcome = this.checkNumCondition(condition.number, slot);
        // checks color condition
        const colorOutcome = this.checkColorCondition(condition.color, slot);
        if (numOutcome && colorOutcome) {
            return {payout: bet, won: true};
        }
        return {payout: 0, won: false};
    }

}