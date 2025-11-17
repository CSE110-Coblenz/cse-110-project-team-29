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
		let dice_sum = d1+d2+d3;
		switch (this.betType) {
			case "threeOfAKindIndividualOdds_111": {if (d1 == 1 && d2 == 1 && d3 == 1) {this.isWin = true;} break;}
			case "threeOfAKindIndividualOdds_222": {if (d1 == 2 && d2 == 2 && d3 == 2) {this.isWin = true;} break;}
			case "threeOfAKindIndividualOdds_333": {if (d1 == 3 && d2 == 3 && d3 == 3) {this.isWin = true;} break;}
			case "threeOfAKindIndividualOdds_444": {if (d1 == 4 && d2 == 4 && d3 == 4) {this.isWin = true;} break;}
			case "threeOfAKindIndividualOdds_555": {if (d1 == 5 && d2 == 5 && d3 == 5) {this.isWin = true;} break;}
			case "threeOfAKindIndividualOdds_666": {if (d1 == 6 && d2 == 6 && d3 == 6) {this.isWin = true;} break;}

			case "threeOfAKindGroupOdds": {if (d1 == d2 && d2 == d3 && d3 == d1) {this.isWin = true;} break;}

			case "pairAndSingleIndividualOdds_112": {if (tripletsEqual(d1,d2,d3,1,1,2)) {this.isWin = true;} break;}
			case "pairAndSingleIndividualOdds_113": {if (tripletsEqual(d1,d2,d3,1,1,3)) {this.isWin = true;} break;}
			case "pairAndSingleIndividualOdds_114": {if (tripletsEqual(d1,d2,d3,1,1,4)) {this.isWin = true;} break;}
			case "pairAndSingleIndividualOdds_115": {if (tripletsEqual(d1,d2,d3,1,1,5)) {this.isWin = true;} break;}
			case "pairAndSingleIndividualOdds_116": {if (tripletsEqual(d1,d2,d3,1,1,6)) {this.isWin = true;} break;}

			case "pairAndSingleIndividualOdds_221": {if (tripletsEqual(d1,d2,d3,2,2,1)) {this.isWin = true;} break;}
			case "pairAndSingleIndividualOdds_223": {if (tripletsEqual(d1,d2,d3,2,2,3)) {this.isWin = true;} break;}
			case "pairAndSingleIndividualOdds_224": {if (tripletsEqual(d1,d2,d3,2,2,4)) {this.isWin = true;} break;}
			case "pairAndSingleIndividualOdds_225": {if (tripletsEqual(d1,d2,d3,2,2,5)) {this.isWin = true;} break;}
			case "pairAndSingleIndividualOdds_226": {if (tripletsEqual(d1,d2,d3,2,2,6)) {this.isWin = true;} break;}

			case "pairAndSingleIndividualOdds_331": {if (tripletsEqual(d1,d2,d3,3,3,1)) {this.isWin = true;} break;}
			case "pairAndSingleIndividualOdds_332": {if (tripletsEqual(d1,d2,d3,3,3,2)) {this.isWin = true;} break;}
			case "pairAndSingleIndividualOdds_334": {if (tripletsEqual(d1,d2,d3,3,3,4)) {this.isWin = true;} break;}
			case "pairAndSingleIndividualOdds_335": {if (tripletsEqual(d1,d2,d3,3,3,5)) {this.isWin = true;} break;}
			case "pairAndSingleIndividualOdds_336": {if (tripletsEqual(d1,d2,d3,3,3,6)) {this.isWin = true;} break;}

			case "pairAndSingleIndividualOdds_441": {if (tripletsEqual(d1,d2,d3,4,4,1)) {this.isWin = true;} break;}
			case "pairAndSingleIndividualOdds_442": {if (tripletsEqual(d1,d2,d3,4,4,2)) {this.isWin = true;} break;}
			case "pairAndSingleIndividualOdds_443": {if (tripletsEqual(d1,d2,d3,4,4,3)) {this.isWin = true;} break;}
			case "pairAndSingleIndividualOdds_445": {if (tripletsEqual(d1,d2,d3,4,4,5)) {this.isWin = true;} break;}
			case "pairAndSingleIndividualOdds_446": {if (tripletsEqual(d1,d2,d3,4,4,6)) {this.isWin = true;} break;}

			case "pairAndSingleIndividualOdds_551": {if (tripletsEqual(d1,d2,d3,5,5,1)) {this.isWin = true;} break;}
			case "pairAndSingleIndividualOdds_552": {if (tripletsEqual(d1,d2,d3,5,5,2)) {this.isWin = true;} break;}
			case "pairAndSingleIndividualOdds_553": {if (tripletsEqual(d1,d2,d3,5,5,3)) {this.isWin = true;} break;}
			case "pairAndSingleIndividualOdds_554": {if (tripletsEqual(d1,d2,d3,5,5,4)) {this.isWin = true;} break;}
			case "pairAndSingleIndividualOdds_556": {if (tripletsEqual(d1,d2,d3,5,5,6)) {this.isWin = true;} break;}

			case "pairAndSingleIndividualOdds_661": {if (tripletsEqual(d1,d2,d3,6,6,1)) {this.isWin = true;} break;}
			case "pairAndSingleIndividualOdds_662": {if (tripletsEqual(d1,d2,d3,6,6,2)) {this.isWin = true;} break;}
			case "pairAndSingleIndividualOdds_663": {if (tripletsEqual(d1,d2,d3,6,6,3)) {this.isWin = true;} break;}
			case "pairAndSingleIndividualOdds_664": {if (tripletsEqual(d1,d2,d3,6,6,4)) {this.isWin = true;} break;}
			case "pairAndSingleIndividualOdds_665": {if (tripletsEqual(d1,d2,d3,6,6,5)) {this.isWin = true;} break;}

			case "threeSinglesIndividualOdds_123": {if (tripletsEqual(d1,d2,d3,1,2,3)) {this.isWin = true;} break;}
			case "threeSinglesIndividualOdds_124": {if (tripletsEqual(d1,d2,d3,1,2,4)) {this.isWin = true;} break;}
			case "threeSinglesIndividualOdds_125": {if (tripletsEqual(d1,d2,d3,1,2,5)) {this.isWin = true;} break;}
			case "threeSinglesIndividualOdds_126": {if (tripletsEqual(d1,d2,d3,1,2,6)) {this.isWin = true;} break;}
			case "threeSinglesIndividualOdds_134": {if (tripletsEqual(d1,d2,d3,1,3,4)) {this.isWin = true;} break;}
			case "threeSinglesIndividualOdds_135": {if (tripletsEqual(d1,d2,d3,1,3,5)) {this.isWin = true;} break;}
			case "threeSinglesIndividualOdds_136": {if (tripletsEqual(d1,d2,d3,1,3,6)) {this.isWin = true;} break;}
			case "threeSinglesIndividualOdds_145": {if (tripletsEqual(d1,d2,d3,1,4,5)) {this.isWin = true;} break;}
			case "threeSinglesIndividualOdds_146": {if (tripletsEqual(d1,d2,d3,1,4,6)) {this.isWin = true;} break;}
			case "threeSinglesIndividualOdds_156": {if (tripletsEqual(d1,d2,d3,1,5,6)) {this.isWin = true;} break;}
			case "threeSinglesIndividualOdds_234": {if (tripletsEqual(d1,d2,d3,2,3,4)) {this.isWin = true;} break;}
			case "threeSinglesIndividualOdds_235": {if (tripletsEqual(d1,d2,d3,2,3,5)) {this.isWin = true;} break;}
			case "threeSinglesIndividualOdds_236": {if (tripletsEqual(d1,d2,d3,2,3,6)) {this.isWin = true;} break;}
			case "threeSinglesIndividualOdds_245": {if (tripletsEqual(d1,d2,d3,2,4,5)) {this.isWin = true;} break;}
			case "threeSinglesIndividualOdds_246": {if (tripletsEqual(d1,d2,d3,2,4,6)) {this.isWin = true;} break;}
			case "threeSinglesIndividualOdds_256": {if (tripletsEqual(d1,d2,d3,2,5,6)) {this.isWin = true;} break;}
			case "threeSinglesIndividualOdds_345": {if (tripletsEqual(d1,d2,d3,3,4,5)) {this.isWin = true;} break;}
			case "threeSinglesIndividualOdds_346": {if (tripletsEqual(d1,d2,d3,3,4,6)) {this.isWin = true;} break;}
			case "threeSinglesIndividualOdds_356": {if (tripletsEqual(d1,d2,d3,3,5,6)) {this.isWin = true;} break;}
			case "threeSinglesIndividualOdds_456": {if (tripletsEqual(d1,d2,d3,4,5,6)) {this.isWin = true;} break;}

			case "threeOutOfFourOdds_1234": {if (tripletsEqual(d1,d2,d3,1,2,3)||tripletsEqual(d1,d2,d3,1,2,4)||tripletsEqual(d1,d2,d3,1,3,4)||tripletsEqual(d1,d2,d3,2,3,4)) {this.isWin = true;} break;}
			case "threeOutOfFourOdds_2345": {if (tripletsEqual(d1,d2,d3,2,3,4)||tripletsEqual(d1,d2,d3,2,3,5)||tripletsEqual(d1,d2,d3,2,4,5)||tripletsEqual(d1,d2,d3,3,4,5)) {this.isWin = true;} break;}
			case "threeOutOfFourOdds_2356": {if (tripletsEqual(d1,d2,d3,2,3,5)||tripletsEqual(d1,d2,d3,2,3,6)||tripletsEqual(d1,d2,d3,2,5,6)||tripletsEqual(d1,d2,d3,3,5,6)) {this.isWin = true;} break;}
			case "threeOutOfFourOdds_3456": {if (tripletsEqual(d1,d2,d3,3,4,5)||tripletsEqual(d1,d2,d3,3,4,6)||tripletsEqual(d1,d2,d3,3,5,6)||tripletsEqual(d1,d2,d3,4,5,6)) {this.isWin = true;} break;}

			case "totals4Through17Odds_4":  {if (dice_sum == 4)  {this.isWin = true;} break;}
			case "totals4Through17Odds_5":  {if (dice_sum == 5)  {this.isWin = true;} break;}
			case "totals4Through17Odds_6":  {if (dice_sum == 6)  {this.isWin = true;} break;}
			case "totals4Through17Odds_7":  {if (dice_sum == 7)  {this.isWin = true;} break;}
			case "totals4Through17Odds_8":  {if (dice_sum == 8)  {this.isWin = true;} break;}
			case "totals4Through17Odds_9":  {if (dice_sum == 9)  {this.isWin = true;} break;}
			case "totals4Through17Odds_10": {if (dice_sum == 10) {this.isWin = true;} break;}
			case "totals4Through17Odds_11": {if (dice_sum == 11) {this.isWin = true;} break;}
			case "totals4Through17Odds_12": {if (dice_sum == 12) {this.isWin = true;} break;}
			case "totals4Through17Odds_13": {if (dice_sum == 13) {this.isWin = true;} break;}
			case "totals4Through17Odds_14": {if (dice_sum == 14) {this.isWin = true;} break;}
			case "totals4Through17Odds_15": {if (dice_sum == 15) {this.isWin = true;} break;}
			case "totals4Through17Odds_16": {if (dice_sum == 16) {this.isWin = true;} break;}
			case "totals4Through17Odds_17": {if (dice_sum == 17) {this.isWin = true;} break;}
			
			case "smallOdds": {if (dice_sum <= 10) {this.isWin = true;} break;}
			
			case "bigOdds": {if (dice_sum >= 11) {this.isWin = true;} break;}

			case "oddOdds": {if (dice_sum % 2 == 1) {this.isWin = true;} break;}

			case "evenOdds": {if (dice_sum % 2 == 0) {this.isWin = true;} break;}

			case "pairSameOdds": {if (d1 == d2 || d2 == d3 || d3 == d1) {this.isWin = true;} break;}
		}


}
}