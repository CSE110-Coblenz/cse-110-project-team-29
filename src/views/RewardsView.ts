import Konva from "konva";
import type { View } from "./View";
import { RewardScreenController } from "../controller/RewardScreenController";
import { STAGE_WIDTH } from "../constants";
import { Group } from "konva/lib/Group";


/**
 * RewardsView - Renders the Rewards Screen Popup
 */
export class RewardsView implements View {
    private group: Konva.Group;
    
    private controller: RewardScreenController;

    private layer: Konva.Layer;

    private barBg!: Konva.Rect;
    private barFill!: Konva.Rect;
    private cashText!: Konva.Text;
    private continueButton!: Konva.Rect;
    private continueText!: Konva.Text;

    constructor(controller: RewardScreenController, containerId: string){
        this.controller = controller;
        
        this.layer = new Konva.Layer;

        this.group = new Konva.Group({ visible: false});
        this.layer.add(this.group);

        this.createPopup();
        this.initializeButton();

        this.layer.draw();
    }

    private createPopup(): void {
        //Background
        const popupBg = new Konva.Rect({
            x: STAGE_WIDTH / 2,
            y: 150,
            width: 500
        });
        this.group.add(popupBg);

        //Title Text
        const title = new Konva.Text({
            x: 200,
            y: 130,
            text: "You Have Gotten The Question Correct!!",
            fontSize: 20,
            fontFamily: "Arial",
            fill: "#000000",
            width: 400,
            align: "center",
        });
        this.group.add(title);

        //Cash Text
        this.cashText = new Konva.Text({
            x: 200,
            y: 130,
            text: "Money Earned: $0",
            fontSize: 18,
            fontFamily: "Arial",
            fill: "#000000",
            width: 400,
            align: "center",
        });
        this.group.add(this.cashText);

        //Progress Bar Code
        this.barBg = new Konva.Rect({
            x: 200,
            y: 240,
            width: 400,
            height: 20,
            fill: "#555",
            cornerRadius: 10,
        });
        this.group.add(this.barBg);

        this.barFill = new Konva.Rect({
            x: 200,
            y: 240,
            width: 0,
            height: 20,
            fill: "#128f1c",
            cornerRadius: 10,
        });
        this.group.add(this.barFill);

        /**
         * Continue Button Code
         */
        this.continueButton = new Konva.Rect({
            x: 300,
            y: 300,
            width: 200,
            height: 60,
            fill: "#66666cff",
            cornerRadius: 15,
            shadowColor: "#000000",
            shadowOffset: { x:3, y:3 },
            shadowOpacity: 0.5,
        });
        this.group.add(this.continueButton);

        this.continueText = new Konva.Text({
            x: 300,
            y: 318,
            text: "Continue",
            fontSize: 18,
            fontFamily: "Arial",
            fill: "#000000",
            width: 400,
            align: "center"
        });
        this.group.add(this.continueText);

    }

    /**
     * Code to get the Continue button to work
     */
    private initializeButton(): void {
        //Hover Animation
        this.continueButton.on("mousecenter", () => {
            document.body.style.cursor = "pointer";
            this.continueButton.scale({ x:1.1, y:1.1 });
            this.layer.draw();
        });

        //Leaves Animation
        this.continueButton.on("mouseleave", () => {
            document.body.style.cursor = "default";
            this.continueButton.scale({ x: 1, y: 1, });
            this.layer.draw();
        });

        //Click event
        this.continueButton.on("click", () => {
            this.hide();
            //Code that handles the next page
        });
    }

    show(): void {
        this.group.visible(true);
        this.update();
        this.layer.draw();
    }

    hide(): void {
        this.group.visible(false);
        this.layer.draw();
    }

    getGroup(): Group {
        return this.group;
    }

    public update(): void {
        const progress = this.controller.getProgress();
        const money = this.controller.getCash();

        //Update the Progress Bar
        this.barFill.width(400 * progress);
        this.cashText.text(`Money Earned: $${money.toFixed(2)}`);

        if (progress == 1){
            //Code to check when act is complete
        }

        this.layer.draw();
    }


}