import Konva from "konva";
import type { View } from "./View.ts";
import { RewardsModel } from "../models/RewardsModel.ts";

export class Minigame1View implements View {
    private stage: Konva.Stage;
    private layer: Konva.Layer;
    private background: Konva.Rect;
    private questionCard: Konva.Rect;
    private questionText: Konva.Text;
    private inputLabel: Konva.Text;
    private input: HTMLInputElement;
    private moneyText: Konva.Text;

    constructor() {
        this.stage = new Konva.Stage({
            container: "konva-container",
            width: window.innerWidth,
            height: window.innerHeight,
        });

        this.layer = new Konva.Layer();
        this.stage.add(this.layer);

        // Background gradient
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

        this.moneyText = new Konva.Text({
            x: 0,
            y: 60, // moved down
            width: this.stage.width(),
            text: `Total Money Earned: $${RewardsModel.getInstance().getCash()}`,
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

        const cardWidth = 800;
        const cardHeight = 375;
        const cardX = (this.stage.width() - cardWidth) / 2;
        const cardY = (this.stage.height() - cardHeight) / 2 - 30;

        this.questionCard = new Konva.Rect({
            x: cardX,
            y: cardY,
            width: cardWidth,
            height: cardHeight,
            fillLinearGradientStartPoint: { x: 0, y: 0 },
            fillLinearGradientEndPoint: { x: 0, y: cardHeight },
            fillLinearGradientColorStops: [0, "lightgreen", 1, "darkgreen"],
            cornerRadius: 25,
            shadowColor: "#000",
            shadowBlur: 25,
            shadowOpacity: 0.2,
            shadowOffset: { x: 0, y: 5 },
        });
        this.layer.add(this.questionCard);

        

    show() {
        this.stage.show();
        this.input.style.display = "block";
        this.input.focus();
    }

    hide() {
        this.stage.hide();
        this.input.style.display = "none";
    }

    updateOdds(question: string) {
        //fill
    }

    onSubmit(callback: (answer: string) => void) {
        //fill
    }

    getGroup(): Konva.Group {
        return new Konva.Group();
    }
}
}
