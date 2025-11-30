// Act2View.ts
import Konva from "konva";
import type { View } from "./View.ts";
import { RewardsModel } from "../models/RewardsModel.ts";
import { STAGE_HEIGHT, STAGE_WIDTH } from "../constants.ts";

export class Act2View implements View {
    private stage: Konva.Stage;
    private layer: Konva.Layer;
    private background: Konva.Rect;
    private questionCard: Konva.Rect;
    private questionText: Konva.Text;
    private inputLabel: Konva.Text;
    private input: HTMLInputElement;
    private moneyText: Konva.Text;
    private tutorialImg: string[] = [];
    private tutorialIdx: number = 0;
    private tutorialImageNode: Konva.Image | null = null;

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
            fillLinearGradientColorStops: [0, "#000000", 1, "#177dd5ff"],
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
            fill: "#ffee00ff",
            shadowColor: "#d6d82bff",
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
            fillLinearGradientColorStops: [0, "lightyellow", 1, "yellow"],
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

        window.addEventListener("resize", () => this.onResize());
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

    private onResize() {
        this.stage.width(window.innerWidth);
        this.stage.height(window.innerHeight);

        
        this.background.width(this.stage.width());
        this.background.height(this.stage.height());
        this.background.fillLinearGradientEndPoint({ x: 0, y: this.stage.height() });

       
        this.moneyText.width(this.stage.width());

        
        const cardWidth = this.questionCard.width();
        const cardHeight = this.questionCard.height();
        const cardX = (this.stage.width() - cardWidth) / 2;
        const cardY = (this.stage.height() - cardHeight) / 2 - 30;
        this.questionCard.position({ x: cardX, y: cardY });

        this.questionText.x(cardX + 30);
        this.questionText.y(cardY + (cardHeight - this.questionText.height()) / 2);
        this.questionText.width(cardWidth - 60);


        this.inputLabel.x(cardX);
        this.inputLabel.y(cardY + cardHeight + 50);
        this.inputLabel.width(cardWidth);

        this.positionInput();

        this.layer.draw();
    }

public showTutorialImage(url: string){
        const img = new Image();
        img.src = url;

        img.onload = () => {
            if (this.tutorialImageNode){
                this.tutorialImageNode.destroy();
            }

            this.tutorialImageNode = new Konva.Image({
                image: img,
                x: STAGE_WIDTH / 2 - img.width / 2 + 250,
                y: STAGE_HEIGHT / 2 - img.height / 2,
            });

            this.layer.add(this.tutorialImageNode);
            this.layer.draw();
        }
    }

    startTutorial(images: string[], onFinished:() => void){
        this.tutorialImg = images;
        this.tutorialIdx = 0;

        this.showTutorialImage(images[0]!);

        //Click to Progress
        this.stage.off("click.tutorial");
        this.stage.on("click.tutorial", () =>{
            this.tutorialIdx++;
           
            if (this.tutorialIdx >= this.tutorialImg.length){
                //End Tutorial
                if (this.tutorialImageNode) {
                    this.tutorialImageNode.destroy();
                    this.tutorialImageNode = null;
                }

                this.stage.off("click.tutorial");

                this.layer.draw();
                onFinished();
                return;
                
            }

            this.showTutorialImage(this.tutorialImg[this.tutorialIdx]!);

        });
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
