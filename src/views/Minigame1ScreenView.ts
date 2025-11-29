import Konva from "konva";
import type { View } from "./View.ts";
import { RewardsModel } from "../models/RewardsModel.ts";
import { STAGE_WIDTH, STAGE_HEIGHT } from "../constants.ts";
import { createButton } from "../helper.ts";

export class Minigame1View implements View {

    private stage: Konva.Stage;
    private layer: Konva.Layer;
    private background: Konva.Rect;
    private moneyText: Konva.Text;
    private model: RewardsModel;

    private diceImages: HTMLImageElement[] = [];
    private diceSprites: Konva.Image[] = [];

    private rollButton: Konva.Group | null = null;
    private betInput: HTMLInputElement | null = null;

    // Odds buttons (one for each type)
    private oddsButtons: Record<string, Konva.Group> = {};

    constructor() {

        this.stage = new Konva.Stage({
            container: "konva-container",
            width: STAGE_WIDTH,
            height: STAGE_HEIGHT,
        });

        this.model = RewardsModel.getInstance();

        this.layer = new Konva.Layer();
        this.stage.add(this.layer);

        this.background = new Konva.Rect({
            x: 0,
            y: 0,
            width: this.stage.width(),
            height: this.stage.height(),
            fillLinearGradientStartPoint: { x: 0, y: 0 },
            fillLinearGradientEndPoint: { x: 0, y: this.stage.height() },
            fillLinearGradientColorStops: [0, "#000000", 1, "#ff0000"],
        });
        this.layer.add(this.background);

        for (let i = 1; i <= 6; i++) {
            const img = new Image();
            img.src = `/dice-six-faces-${i}.png`;
            this.diceImages[i - 1] = img;
        }

        for (let i = 0; i < 3; i++) {
            const sprite = new Konva.Image({
                x: 120 + i * 140,
                y: 180,
                width: 110,
                height: 110,
                image: this.diceImages[0],
            });
            this.layer.add(sprite);
            this.diceSprites[i] = sprite;
        }

        this.moneyText = new Konva.Text({
            x: 0,
            y: 40,
            width: this.stage.width(),
            text: `Total Money Earned: $${this.model.getCash()}`,
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

        // ---------- Create Buttons ----------
        this.initializeButtons();

        this.layer.draw();
    }

    private initializeButtons() {

        let y = 350;
        const x = 40;

        const bets = [
            "threeOfAKindIndividualOdds",
            "threeOfAKindGroupOdds",
            "pairAndSingleIndividualOdds",
            "threeSinglesIndividualOdds",
            "threeOutOfFourOdds",
            "totals4Through17Odds",
            "smallOdds",
            "bigOdds",
            "oddOdds",
            "evenOdds"
        ];

        bets.forEach((name) => {
            const btn = createButton(name, x, y, () => this.onOddsSelect(name), this.layer);
            this.oddsButtons[name] = btn;
            y += 70;
        });

        // Roll Button
        this.rollButton = createButton(
            "ROLL DICE",
            STAGE_WIDTH - 340,
            520,
            () => this.onRollClick(),
            this.layer
        );
    }


    private onOddsSelect(name: string) {
        console.log("Selected odds:", name);
    }

    private onRollClick() {
        console.log("Roll button clicked");
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
        const msg = isWin
            ? `You won $${winnings}!`
            : `You lost $${Math.abs(winnings)}`;
        alert(msg);
    }

    public showError(msg: string) {
        alert("Error: " + msg);
    }

    getGroup(): Konva.Group {
        return this.layer;
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
