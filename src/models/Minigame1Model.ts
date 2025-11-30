// Minigame1Model.ts
import { RewardsModel } from "./RewardsModel.ts";

export class Minigame1Model {
    private static instance: Minigame1Model | null = null;

    public dice1: number;
    public dice2: number;
    public dice3: number;
    public threeOfAKindIndividualOdds: number;
    public threeOfAKindGroupOdds: number;
    public pairAndSingleIndividualOdds: number;
    public threeSinglesIndividualOdds: number;
    public threeOutOfFourOdds: number;
    public totals4Through17Odds: number[];
    public smallOdds: number;
    public bigOdds: number;
    public oddOdds: number;
    public evenOdds: number;
    public bet: number;
    public betOdds: number;
    public betType: string;
    public isWin: boolean;
    public required_dice: number[];
    public rewardsModel: RewardsModel;

    private constructor() {
        this.dice1 = 1;
        this.dice2 = 1;
        this.dice3 = 1;
        this.threeOfAKindIndividualOdds = 180;
        this.threeOfAKindGroupOdds = 30;
        this.pairAndSingleIndividualOdds = 50;
        this.threeSinglesIndividualOdds = 30;
        this.threeOutOfFourOdds = 7;
        this.totals4Through17Odds = [60, 20, 18, 12, 8, 6, 6, 6, 6, 8, 12, 18, 20, 60];
        this.smallOdds = 1;
        this.bigOdds = 1;
        this.oddOdds = 1;
        this.evenOdds = 1;
        this.bet = 0;
        this.betOdds = 0;
        this.betType = "";
        this.isWin = false;
        this.required_dice = [0, 0, 0, 0, 0];

        this.rewardsModel = RewardsModel.getInstance();
    }

    public static getInstance(): Minigame1Model {
        if (!Minigame1Model.instance) {
            Minigame1Model.instance = new Minigame1Model();
        }
        return Minigame1Model.instance;
    }
}
