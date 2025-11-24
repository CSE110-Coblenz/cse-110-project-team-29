import Konva from "konva";
import type { View } from "./View.ts";
import { RewardsModel } from "../models/RewardsModel.ts";
import { STAGE_WIDTH, STAGE_HEIGHT } from "../constants.ts";


export class Minigame1View implements View {
    private stage: Konva.Stage;
    private layer: Konva.Layer;
    private background: Konva.Rect;
    private moneyText: Konva.Text;
    private model: RewardsModel;

    constructor() {
        this.stage = new Konva.Stage({
            container: "konva-container",
            width: STAGE_WIDTH,
            height: STAGE_HEIGHT,
        });
        
        this.model = RewardsModel.getInstance();
        this.layer = new Konva.Layer();
        this.stage.add(this.layer);

        // Background gradient
        // Taken from Aman's Class
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

        //Money amount
        //Modified from Aman's Class
        this.moneyText = new Konva.Text({
            x: 0,
            y: 60, // moved down
            width: this.stage.width(),
            text: `Total Money Earned: $${this.model.getCash()}`,
            fontSize: 48, // bigger
            fontFamily: "Poppins, Arial, sans-serif",
            fontStyle: "bold",
            fill: "#00ff00",
            shadowColor: "#00ff00",
            shadowBlur: 10,
            shadowOpacity: 0.8,
            align: "center",
        });
        this.layer.add(this.moneyText);

        
}
}


//export interface Minigame1View {
//    displayDice(d1: number, d2: number, d3: number): void;
//    displayOdds(oddsObj: { [key: string]: number }): void;
//    displayResult(isWin: boolean, winnings: number): void;
//    displayCash(amount: number): void;
//    showBetSelectionUI(): void;
//    showRollButton(): void;
//    showError(msg: string): void;
//}
