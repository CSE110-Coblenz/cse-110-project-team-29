/**
 * WIP: Currently Setting Cash and Returning Current
 */


export class RewardsModel{
    
    //Base Variables
    private totalCash: number;
    private currentQuestion: number;
    private totalQuestions: number;

    constructor(totalQuestions: number) {
        this.totalCash = 0;
        this.currentQuestion = 0;
        this.totalQuestions = totalQuestions;
    }

    /**
     * Increases player's total for correct answer
     * @param amount 
     */
    public addCash(amount: number): void {
        this.totalCash += amount;
    }

    /**
     * Increases progress after answering a question
     * Mainly for Progress Bar
     */
    public incrementProgress(): void {
        if(this.currentQuestion < this.totalQuestions){
            this.currentQuestion++;
        }
    }

    /**
     * Reset for next act
     */
    public resetProgress(): void {
        this.currentQuestion = 0;
    }

    /**
     * Returns Player's Total Cash
     * @returns Total Cash
     */
    public getCash(): number {
        return this.totalCash;
    }


    /**
     * Returns Player's Current Act Progress
     * @returns 
     */
    public getProgress(): number {
        return this.totalQuestions === 0
        ? 0
        : this.currentQuestion / this.totalQuestions;
    }

    /**
     * Checks if Act is completed
     * @returns True if Act is completed, False if Act is not Completed
     */
    public isActComplete(): boolean {
        return this.currentQuestion >= this.totalQuestions;
    }
}