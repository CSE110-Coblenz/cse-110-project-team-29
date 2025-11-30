import Konva from "konva";
import type { View } from "./View.ts";
import { STAGE_WIDTH, STAGE_HEIGHT } from "../constants.ts";
import { createButton } from "../helper.ts";
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
            const img = new Image();
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

        this.layer.draw();
    }

    private initializeDice() {
        const diceY = 180;
        for (let i = 0; i < 3; i++) {
            const sprite = new Konva.Image({
                x: 120 + i * 140,
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
        createButton("Three of a Kind", 40, 40, () => this.onRollClick(), this.layer);
        createButton("All Three of a Kind", 40, 40, () => this.onRollClick(), this.layer);
        createButton("A Pair and a Single", 40, 40, () => this.onRollClick(), this.layer);
        createButton("Three Singles", 40, 40, () => this.onRollClick(), this.layer);
        createButton("Three out of Four", 40, 40, () => this.onRollClick(), this.layer);
        createButton("Total Sum of Dice (4-17)", 40, 40, () => this.onRollClick(), this.layer);
        createButton("Small Odds", 40, 40, () => this.onRollClick(), this.layer);
        createButton("Big Odds", 40, 40, () => this.onRollClick(), this.layer);
        createButton("Odd Odds", 40, 40, () => this.onRollClick(), this.layer);
        createButton("Even Odds", 40, 40, () => this.onRollClick(), this.layer);

    
        // Roll button
        this.rollButton = createButton(
            "ROLL DICE", STAGE_WIDTH - 340, 520, () => this.onRollClick(), this.layer
        );
    }

    private onRollClick() {
        this.controller.roll_dice();
        const { dice1, dice2, dice3 } = this.minigame1Model;
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

    public displayResult(isWin: boolean, winnings: number) {
        alert(isWin ? `You won $${winnings}!` : `You lost $${Math.abs(winnings)}`);
    }

    getGroup(): Konva.Group {
        return this.group;
    }

    show(): void {
        this.layer.show();
        this.layer.draw();
    }

    hide(): void {
        this.layer.hide();
        this.layer.draw();
    }
}
