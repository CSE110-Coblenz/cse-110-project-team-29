// Act2View.ts
import Konva from "konva";
import type { View } from "./View.ts";
import { RewardsModel } from "../models/RewardsModel.ts";
import { STAGE_WIDTH, STAGE_HEIGHT } from "../constants.ts";

export class Act3View implements View {
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
            width: STAGE_WIDTH,
            height: STAGE_HEIGHT,
        });

        this.layer = new Konva.Layer();
        this.stage.add(this.layer);

        // Background gradient
        Konva.Image.fromURL("act3Background.png", (bg) => {
            bg.x(0);
            bg.y(0);
            bg.width(STAGE_WIDTH);
            bg.height(STAGE_HEIGHT);
            
            this.background = bg;
            this.layer.add(this.background);
            this.background.moveToBottom();
        });

        this.moneyText = new Konva.Text({
            x: 0,
            y: 60, // moved down
            width: this.stage.width(),
            text: `Total Money Earned: $${RewardsModel.getInstance().getCash()}`,
            fontSize: 48, // bigger
            fontFamily: "Poppins, Arial, sans-serif",
            fontStyle: "bold",
            fill: "grey",
            shadowColor: "darkgrey",
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
            fillLinearGradientColorStops: [0, "lightgrey", 1, "darkgrey"],
            cornerRadius: 25,
            shadowColor: "#000",
            shadowBlur: 25,
            shadowOpacity: 0.2,
            shadowOffset: { x: 0, y: 5 },
        });
        this.layer.add(this.questionCard);

        
        this.questionText = new Konva.Text({
            x: cardX + 30,
            y: cardY + 30,
            width: cardWidth - 60,
            height: cardHeight - 60,
            fontSize: 28,
            fontFamily: "Georgia, Poppins, serif",
            fontStyle: "italic",
            fill: "#1a1a1a",
            align: "center",
            verticalAlign: "middle",
            lineHeight: 1.5,
            wrap: "word",
        });
        this.layer.add(this.questionText);

       this.inputLabel = new Konva.Text({
            x: 0, 
            y: 0,
            width: 70, 
            text: "Enter  :",
            fontSize: 22,
            fontFamily: "Georgia, Poppins, serif",
            fontStyle: "bold",
            fill: "#black",
            align: "left", 
        });

        this.layer.add(this.inputLabel);


        // HTML input
        this.input = document.createElement("input");
        this.input.type = "text";
        this.input.placeholder = "Type your answer...";
        Object.assign(this.input.style, {
            position: "absolute",
            padding: "12px 20px",
            fontSize: "20px",
            borderRadius: "12px",
            border: "2px solid #ccc",
            outline: "none",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            transition: "all 0.2s",
        });
        this.input.onfocus = () => (this.input.style.borderColor = "#ff6a88");
        this.input.onblur = () => (this.input.style.borderColor = "#ccc");
        document.body.appendChild(this.input);
        this.positionInput();
    }

    
    private positionInput() {
       const cardX = this.questionCard.x();
       const cardY = this.questionCard.y();
       const cardWidth = this.questionCard.width();

    
       const totalWidth = 400 + 70; 
       const startX = cardX + (cardWidth - totalWidth) / 2;
       const inputY = cardY + this.questionCard.height() + 40;

    
       this.inputLabel.x(startX - 5);
       this.inputLabel.y(inputY + 85); 
       this.inputLabel.width(100);

  
       this.input.style.top = `${inputY + 70}px`;
       this.input.style.left = `${startX + 100}px`;
       this.input.style.width = `400px`;
    }

    show() {
        this.stage.show();
        this.input.style.display = "block";
        this.input.focus();
    }

    hide() {
        this.stage.hide();
        this.input.style.display = "none";
    }

    updateQuestion(question: string) {
        this.questionText.text(question);
        const cardY = this.questionCard.y();
        const cardHeight = this.questionCard.height();
        this.questionText.y(cardY + (cardHeight - this.questionText.height()) / 2);
        this.layer.draw();
        this.input.value = "";
        this.input.focus();
    }

    onSubmit(callback: (answer: string) => void) {
        this.input.onkeydown = (e) => {
            if (e.key === "Enter") callback(this.input.value);
        };
    }

    getGroup(): Konva.Group {
        return new Konva.Group();
    }
}