import { plusOrMinusInt } from "../helper.ts";
import { randIntBetween } from "../helper.ts";
import { tripletsEqual } from "../helper.ts";
import { Minigame1Model } from "../models/Minigame1Model.ts";

	

export class Minigame1Controller {
	private model: Minigame1Model;


	constructor() {
		this.model = Minigame1Model.getInstance();
	}

	public roll_dice() {
		this.model.dice1 = randIntBetween(1, 6);
		this.model.dice2 = randIntBetween(1, 6);
		this.model.dice3 = randIntBetween(1, 6);
	}

	public reset_odds() {
		this.model.dice1 = 1;
		this.model.dice2 = 1;
		this.model.dice3 = 1;
		this.model.threeOfAKindIndividualOdds = 180;
		this.model.threeOfAKindGroupOdds = 30;
		this.model.pairAndSingleIndividualOdds = 50;
		this.model.threeSinglesIndividualOdds = 30;
		this.model.threeOutOfFourOdds = 7;
		this.model.totals4Through17Odds = [60,20,18,12,8,6,6,6,6,8,12,18,20,60];
		this.model.smallOdds = 1;
		this.model.bigOdds = 1;
		this.model.oddOdds = 1;
		this.model.evenOdds = 1;
	}

	public randomize_odds() {

		this.reset_odds();

		this.model.threeOfAKindIndividualOdds += plusOrMinusInt(30);
		this.model.threeOfAKindGroupOdds += plusOrMinusInt(7);
		this.model.pairAndSingleIndividualOdds += plusOrMinusInt(12);
		this.model.threeSinglesIndividualOdds += plusOrMinusInt(7);
		this.model.threeOutOfFourOdds += plusOrMinusInt(2);
		for (let i = 0; i <= 13; i++) {
			let x = 0;
			if (i == 0 || i == 13) {
				x = 20;
			}
			else if (i == 1 || i == 12) {
				x = 5;
			}
			else if (i == 2 || i == 11) {
				x = 4;
			}
			else if (i == 3 || i == 10) {
				x = 3;
			}
			else if (i <= 9 && i >=4) {
				x = 2;
			}
			this.model.totals4Through17Odds[i] += plusOrMinusInt(x);
		}	
	}

	public setBetOdds(): void {
		this.model.betOdds = this.betOddsChoose();
	}

	public setBet(bet: number, betType: string, required_dice: Array<number>) {
		this.model.bet = bet; 
		if (this.model.bet > this.model.rewardsModel.getCash() || this.model.bet < 0) {
			this.model.bet = 0;
		}
		this.model.betType = betType; 
		for (let i = 0; i < 5; i++) {
			this.model.required_dice[i] = required_dice[i] || 0;
		}
		this.setBetOdds();
		this.model.rewardsModel.subtractCash(this.model.bet);
	}

	public betOddsChoose(): number {
		switch (this.model.betType) {
			case "threeOfAKindIndividualOdds": {return this.model.threeOfAKindIndividualOdds;}
			case "threeOfAKindGroupOdds": {return this.model.threeOfAKindGroupOdds;}
			case "pairAndSingleIndividualOdds": {return this.model.pairAndSingleIndividualOdds;}
			case "threeSinglesIndividualOdds": {return this.model.threeSinglesIndividualOdds;}
			case "threeOutOfFourOdds": {return this.model.threeOutOfFourOdds;}
			case "totals4Through17Odds":{return this.model.totals4Through17Odds[(this.model.required_dice[4] - 4)];}
			case "smallOdds": {return this.model.smallOdds;}
			case "bigOdds": {return this.model.bigOdds;}
			case "oddOdds": {return this.model.oddOdds;}
			case "evenOdds": {return this.model.evenOdds;}
		}
	return 0;
	}
	
	public returnBetStatus(): boolean {
		return this.model.isWin;
	}

	public winBet() {
		this.model.rewardsModel.addCash(this.model.bet + this.model.bet*this.model.betOdds);
		this.model.bet = 0;
		this.model.betOdds = 0;
		this.model.required_dice = [0, 0, 0, 0, 0];
	}

	public loseBet() {
		this.model.bet = 0;
		this.model.betOdds = 0;
		this.model.required_dice = [0, 0, 0, 0, 0]; 
	}

	public determineWin() {
		let d1 = this.model.dice1;
		let d2 = this.model.dice2;
		let d3 = this.model.dice3;
		let dice_sum = d1+d2+d3;
		let b1 = this.model.required_dice[0];
		let b2 = this.model.required_dice[1];
		let b3 = this.model.required_dice[2];
		let b4 = this.model.required_dice[3];
		let bsum = this.model.required_dice[4];
		switch (this.model.betType) { 
			case "threeOfAKindIndividualOdds": {if (tripletsEqual(d1,d2,d3,b1,b2,b3)) {this.model.isWin = true;} break;}
			case "threeOfAKindGroupOdds": {if (d1 == d2 && d2 == d3 && d3 == d1) {this.model.isWin = true;} break;}
			case "pairAndSingleIndividualOdds": {if (tripletsEqual(d1,d2,d3,b1,b2,b3)) {this.model.isWin = true;} break;}
			case "threeSinglesIndividualOdds": {if (tripletsEqual(d1,d2,d3,b1,b2,b3)) {this.model.isWin = true;} break;}	
			case "threeOutOfFourOdds": {if (tripletsEqual(d1,d2,d3,b1,b2,b3)||tripletsEqual(d1,d2,d3,b1,b2,b4)||tripletsEqual(d1,d2,d3,b1,b3,b4)||tripletsEqual(d1,d2,d3,b2,b3,b4)) {this.model.isWin = true;} break;}
			case "totals4Through17Odds":  {if (dice_sum == bsum)  {this.model.isWin = true;} break;}
			case "smallOdds": {if (dice_sum <= 10) {this.model.isWin = true;} break;}			
			case "bigOdds": {if (dice_sum >= 11) {this.model.isWin = true;} break;}
			case "oddOdds": {if (dice_sum % 2 == 1) {this.model.isWin = true;} break;}
			case "evenOdds": {if (dice_sum % 2 == 0) {this.model.isWin = true;} break;}
			default: {this.model.isWin = false;}
		}
	}

	public gamblingLoop() {
		this.setBet(this.model.bet, this.model.betType, this.model.required_dice);
		this.model.isWin = false;
		this.determineWin();
		if (this.model.isWin) {
			this.winBet();
		}
		else {
			this.loseBet();
		}
		this.randomize_odds();
		
	}
}