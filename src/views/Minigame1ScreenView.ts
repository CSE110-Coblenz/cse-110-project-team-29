import Konva from "konva";
import type { View } from "./View.ts";
import { STAGE_WIDTH, STAGE_HEIGHT } from "../constants.ts";
import { createButton, createInputWithLabel } from "../helper.ts";
import { Minigame1Controller } from "../controller/Minigame1ScreenController.ts";
import { RewardsModel } from "../models/RewardsModel.ts";
import { Minigame1Model } from "../models/Minigame1Model.ts";

export class Minigame1View implements View {

    private stage: Konva.Stage;
    private layer: Konva.Layer;
    private background: Konva.Image;
    private moneyText: Konva.Text;
    private group: Konva.Group;

    private diceImages: HTMLImageElement[] = [];
    private diceSprites: Konva.Image[] = [];

    private rollButton: Konva.Group;
    private confirmButton: Konva.Group;

    private oddsButtons: Record<string, Konva.Group> = {};
    private controller: Minigame1Controller;
    private rewardsModel: RewardsModel;
    private minigame1Model: Minigame1Model
    private inputs: HTMLInputElement[] = [];

    constructor(controller: Minigame1Controller) {
        this.controller = controller;

        this.stage = new Konva.Stage({
            container: "konva-container",
            width: STAGE_WIDTH,
            height: STAGE_HEIGHT,
        });

        this.layer = new Konva.Layer();
        this.stage.add(this.layer);

        this.group = new Konva.Group();
        this.layer.add(this.group);

        this.rewardsModel = RewardsModel.getInstance();
        this.minigame1Model = Minigame1Model.getInstance();

        Konva.Image.fromURL("act1Background.png", (bg) => {
            bg.x(0);
            bg.y(0);
            bg.width(STAGE_WIDTH);
            bg.height(STAGE_HEIGHT);

            this.background = bg;
            this.layer.add(this.background);
            this.background.moveToBottom();
        });

        // Preload dice images
        for (let i = 1; i <= 6; i++) {
            let img = new Image();
            img.src = `/dice-six-faces-${i}.png`;
            this.diceImages[i - 1] = img;
        }

        this.moneyText = new Konva.Text({
            x: 0,
            y: 40,
            width: STAGE_WIDTH,
            text: `Total Money Earned: $${this.rewardsModel.getCash()}`,
            fontSize: 42,
            fontFamily: "Poppins, Arial",
            fontStyle: "bold",
            fill: "#00ff00",
            align: "center",
            shadowColor: "#00ff00",
            shadowBlur: 10,
            shadowOpacity: 0.8,
        });
        this.layer.add(this.moneyText);

        this.initializeDice();
        this.initializeButtons();
        this.initializeInputs();

        

        this.layer.draw();
    }

    private initializeDice() {
        let diceY = 570;
        for (let i = 0; i < 3; i++) {
            let sprite = new Konva.Image({
                x: 550 + i * 140,
                y: diceY,
                width: 110,
                height: 110,
                image: this.diceImages[0],
            });
            this.layer.add(sprite);
            this.diceSprites[i] = sprite;
        }
    }

    private initializeButtons() {
        createButton("Single Three of a Kind", 60, 150, () => this.onOddsSelect("Single Three of a Kind"), this.layer);
        createButton("All Three of a Kind", 360, 150, () => this.onOddsSelect("All Three of a Kind"), this.layer);
        createButton("Pair and Single", 660, 150, () => this.onOddsSelect("Pair and Single"), this.layer);
        createButton("Three Singles", 960, 150, () => this.onOddsSelect("Three Singles"), this.layer);
        createButton("Three out of Four", 60, 300, () => this.onOddsSelect("Three out of Four"), this.layer);
        createButton("Sum of Dice (4-17)", 360, 300, () => this.onOddsSelect("Sum of Dice (4-17)"), this.layer);
        createButton("Small Odds", 660, 300, () => this.onOddsSelect("Small Odds"), this.layer);
        createButton("Big Odds", 960, 300, () => this.onOddsSelect("Big Odds"), this.layer);
        createButton("Odd Odds", 660, 450, () => this.onOddsSelect("Odd Odds"), this.layer);
        createButton("Even Odds", 360, 450, () => this.onOddsSelect("Even Odds"), this.layer);        

    
        // Roll button
        this.rollButton = createButton(
            "ROLL DICE", STAGE_WIDTH - 300, 600, () => this.onRollClick(), this.layer
        );
    }

    private initializeInputs() {
        // Three of a Kind
        let singleThreeInput = createInputWithLabel(this.stage, "Triple:", 120, 220, 40);
        this.inputs.push(singleThreeInput);
    
        // Pair and Single 
        let pairInput = createInputWithLabel(this.stage, "Pair:", 670, 220, 40);
        let singleInput = createInputWithLabel(this.stage, "Single:", 780, 220, 40);
        this.inputs.push(pairInput, singleInput);
    
        // Three Singles 
        let threeSingleInput1 = createInputWithLabel(this.stage, "#1:", 950, 220, 40);
        let threeSingleInput2 = createInputWithLabel(this.stage, "#2:", 1030, 220, 40);
        let threeSingleInput3 = createInputWithLabel(this.stage, "#3:", 1110, 220, 40);
        this.inputs.push(threeSingleInput1, threeSingleInput2, threeSingleInput3);
    
        // Three out of Four
        let threeOutOfFour1 = createInputWithLabel(this.stage, "3/4 #1:", 70, 375, 40);
        let threeOutOfFour2 = createInputWithLabel(this.stage, "3/4 #2:", 180, 375, 40);
        let threeOutOfFour3 = createInputWithLabel(this.stage, "3/4 #3:", 70, 410, 40);
        let threeOutOfFour4 = createInputWithLabel(this.stage, "3/4 #4:", 180, 410, 40);
        this.inputs.push(threeOutOfFour1, threeOutOfFour2, threeOutOfFour3, threeOutOfFour4);
    
        // Sum of Dice
        let sumInput = createInputWithLabel(this.stage, "Sum of Dice (4-17):", 375, 375, 40);
        this.inputs.push(sumInput);

        //Bet Input
        let betInput = createInputWithLabel(this.stage, "Bet Amount:", 1000, 570, 80);
        this.inputs.push(betInput);
    }




    public showInputs() {
        this.inputs.forEach((input) => (input.style.display = "inline"));
    }   

    public hideInputs() {
        this.inputs.forEach((input) => (input.style.display = "none"));
    }


    private onRollClick() {
        this.controller.roll_dice();
        let { dice1, dice2, dice3 } = this.minigame1Model;
        this.updateDice(dice1, dice2, dice3);
    }

    public updateDice(d1: number, d2: number, d3: number) {
        this.diceSprites[0].image(this.diceImages[d1 - 1]);
        this.diceSprites[1].image(this.diceImages[d2 - 1]);
        this.diceSprites[2].image(this.diceImages[d3 - 1]);
        this.layer.draw();
    }

    public displayCash(amount: number) {
        this.moneyText.text(`Total Money Earned: $${amount}`);
        this.layer.draw();
    }

    private onOddsSelect(name: string) {
        switch (name) {
            case "Single Three of a Kind":
                this.minigame1Model.betType = "threeOfAKindIndividualOdds";
                break;
            case "All Three of a Kind":
                this.minigame1Model.betType = "threeOfAKindGroupOdds";
                break;
            case "Pair and Single":
                this.minigame1Model.betType = "pairAndSingleIndividualOdds";
                break;
            case "Three Singles":
                this.minigame1Model.betType = "threeSinglesIndividualOdds";
                break;
            case "Three out of Four":
                this.minigame1Model.betType = "threeOutOfFourOdds";
                break;
            case "Sum of Dice (4-17)":
                this.minigame1Model.betType = "totals4Through17Odds";
                break;
            case "Small Odds":
                this.minigame1Model.betType = "smallOdds";
                break;
            case "Big Odds":
                this.minigame1Model.betType = "bigOdds";
                break;
            case "Odd Odds":
                this.minigame1Model.betType = "oddOdds";
                break;
            case "Even Odds":
                this.minigame1Model.betType = "evenOdds";
                break;
            default:
                console.warn("Unknown odds button:", name);
                return;
        }
    }
    

    public displayResult(isWin: boolean, winnings: number) {
        alert(isWin ? `You won $${winnings}!` : `You lost $${Math.abs(winnings)}`);
    }

    getGroup(): Konva.Group {
        return this.group;
    }

    show(): void {
        this.layer.show();
        this.showInputs();
        this.layer.draw();
    }

    hide(): void {
        this.layer.hide();
        this.hideInputs();
        this.layer.draw();
    }




    
}
