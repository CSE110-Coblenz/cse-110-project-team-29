import { plusOrMinusInt } from "../helper";
import { randIntBetween } from "../helper";
import { tripletsEqual } from "../helper";
	

class Minigame1Controller {
	private dice1: number;
	private dice2: number;
	private dice3: number;
	private threeOfAKindIndividualOdds: number;
	private threeOfAKindGroupOdds: number;
	private pairAndSingleIndividualOdds: number;
	private threeSinglesIndividualOdds: number;
	private threeOutOfFourOdds: number;
	private totals4Through17Odds: Array<number>;
	private smallOdds: number;
	private bigOdds: number;
	private oddOdds: number;
	private evenOdds: number;
	private bet: number;
	private betOdds: number;
	private betType: string;
	private isWin: boolean;
	private required_dice: Array<number>;


	constructor() {
		this.dice1 = 1;
		this.dice2 = 1;
		this.dice3 = 1;
		this.threeOfAKindIndividualOdds = 180;
		this.threeOfAKindGroupOdds = 30;
		this.pairAndSingleIndividualOdds = 50;
		this.threeSinglesIndividualOdds = 30;
		this.threeOutOfFourOdds = 7;
		this.totals4Through17Odds = [60,20,18,12,8,6,6,6,6,8,12,18,20,60];
		this.smallOdds = 1;
		this.bigOdds = 1;
		this.oddOdds = 1;
		this.evenOdds = 1;
		this.bet = 0;
		this.betOdds = 0;
		this.betType = "";
		this.isWin = false;
		this.required_dice = [0, 0, 0, 0, 0] //dice we are required to have for a win. 
	}

	public roll_dice() {
		this.dice1 = randIntBetween(1, 6);
		this.dice2 = randIntBetween(1, 6);
		this.dice3 = randIntBetween(1, 6);
	}

	public reset_odds() {
		this.dice1 = 1;
		this.dice2 = 1;
		this.dice3 = 1;
		this.threeOfAKindIndividualOdds = 180;
		this.threeOfAKindGroupOdds = 30;
		this.pairAndSingleIndividualOdds = 50;
		this.threeSinglesIndividualOdds = 30;
		this.threeOutOfFourOdds = 7;
		this.totals4Through17Odds = [60,20,18,12,8,6,6,6,6,8,12,18,20,60];
		this.smallOdds = 1;
		this.bigOdds = 1;
		this.oddOdds = 1;
		this.evenOdds = 1;
	}

	public randomize_odds() {

		this.reset_odds();

		this.threeOfAKindIndividualOdds += plusOrMinusInt(30);
		this.threeOfAKindGroupOdds += plusOrMinusInt(7);
		this.pairAndSingleIndividualOdds += plusOrMinusInt(12);
		this.threeSinglesIndividualOdds += plusOrMinusInt(7);
		this.threeOutOfFourOdds += plusOrMinusInt(2);
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
			this.totals4Through17Odds[i] += plusOrMinusInt(x);
		}	
	}

	public setBet(bet: number, betType: string, required_dice: Array<number>) {
		this.bet = bet; 
		this.betType = betType; 
		for (let i = 0; i < 5; i++) {
			this.required_dice[i] = required_dice[i];
		}
		this.betOdds = this.betOddsChoose();
		//add code subtracting bet money from inventory. need to interact with reward system
	}

	public betOddsChoose(): number {
		switch (this.betType) {
			case "threeOfAKindIndividualOdds": {return this.threeOfAKindIndividualOdds;}
			case "threeOfAKindGroupOdds": {return this.threeOfAKindGroupOdds;}
			case "pairAndSingleIndividualOdds": {return this.pairAndSingleIndividualOdds;}
			case "threeSinglesIndividualOdds": {return this.threeSinglesIndividualOdds;}
			case "threeOutOfFourOdds": {return this.threeOutOfFourOdds;}
			case "totals4Through17Odds":{return this.totals4Through17Odds[(this.required_dice[4] - 4)];}
			case "smallOdds": {return this.smallOdds;}
			case "bigOdds": {return this.bigOdds;}
			case "oddOdds": {return this.oddOdds;}
			case "evenOdds": {return this.evenOdds;}
	}
	return 0;
}

	public winBet() {
		//add code adding bet + bet*betOdds money to inventory. need to interact with reward system
		this.bet = 0;
		this.betOdds = 0;
		this.required_dice = [0, 0, 0, 0, 0];
	}

	public loseBet() {
		this.bet = 0;
		this.betOdds = 0;
		this.required_dice = [0, 0, 0, 0, 0]; 
	}

	public determineWin() {
		let d1 = this.dice1;
		let d2 = this.dice2;
		let d3 = this.dice3;
		let dice_sum = d1+d2+d3;
		let b1 = this.required_dice[0];
		let b2 = this.required_dice[1];
		let b3 = this.required_dice[2];
		let b4 = this.required_dice[3];
		let bsum = this.required_dice[4];
		switch (this.betType) { 
			case "threeOfAKindIndividualOdds": {if (tripletsEqual(d1,d2,d3,b1,b2,b3)) {this.isWin = true;} break;}
			case "threeOfAKindGroupOdds": {if (d1 == d2 && d2 == d3 && d3 == d1) {this.isWin = true;} break;}
			case "pairAndSingleIndividualOdds": {if (tripletsEqual(d1,d2,d3,b1,b2,b3)) {this.isWin = true;} break;}
			case "threeSinglesIndividualOdds": {if (tripletsEqual(d1,d2,d3,b1,b2,b3)) {this.isWin = true;} break;}	
			case "threeOutOfFourOdds": {if (tripletsEqual(d1,d2,d3,b1,b2,b3)||tripletsEqual(d1,d2,d3,b1,b2,b4)||tripletsEqual(d1,d2,d3,b1,b3,b4)||tripletsEqual(d1,d2,d3,b2,b3,b4)) {this.isWin = true;} break;}
			case "totals4Through17Odds":  {if (dice_sum == bsum)  {this.isWin = true;} break;}
			case "smallOdds": {if (dice_sum <= 10) {this.isWin = true;} break;}			
			case "bigOdds": {if (dice_sum >= 11) {this.isWin = true;} break;}
			case "oddOdds": {if (dice_sum % 2 == 1) {this.isWin = true;} break;}
			case "evenOdds": {if (dice_sum % 2 == 0) {this.isWin = true;} break;}
		}
	}
}