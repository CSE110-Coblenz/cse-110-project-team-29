import { plusOrMinusInt } from "../helper";
import { randIntBetween } from "../helper";
	

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
	private pairSameOdds: number;
	private bet: number;
	private betOdds: number;
	private betType: string;
	private isWin: boolean;


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
		this.pairSameOdds = 10;
		this.bet = 0;
		this.betOdds = 0;
		this.betType = "";
		this.isWin = false;
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
		this.pairSameOdds = 10;
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
		this.pairSameOdds += plusOrMinusInt(3);
	}

	public setBet(bet: number, betOdds: number) {
		this.bet = bet; 
		this.betOdds = betOdds;
		this.betType = ""; //implement choosing function
		//add code subtracting bet money from inventory. need to interact with reward system
	}

	public winBet() {
		//add code adding bet + bet*betOdds money to inventory. need to interact with reward system
		this.bet = 0;
		this.betOdds = 0;
	}

	public loseBet() {
		this.bet = 0;
		this.betOdds = 0;
	}

	public determineWin() {
		let d1 = this.dice1;
		let d2 = this.dice2;
		let d3 = this.dice3;
		switch (this.betType) {
			case "threeOfAKindIndividualOdds_111": {
				if (d1 == 1 && d2 == 1 && d3 == 1) {
					this.isWin = true;
				}
				break;
			}
			case "threeOfAKindIndividualOdds_222": {
				if (d1 == 2 && d2 == 2 && d3 == 2) {
					this.isWin = true;
				}
				break;
			}
	}


}
}