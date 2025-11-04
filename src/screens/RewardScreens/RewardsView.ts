import Konva from "konva";
import { ViewInterface } from "./ViewInterface";
import { RewardScreenController } from "./RewardScreenController";


/**
 * RewardsView - Renders the Rewards Screen Popup
 */
export class RewardsView implements ViewInterface {
    private controller: RewardScreenController;

    private layer: Konva.Layer;

    private barBg: Konva.Rect;
    private barFg: Konva.Rect;
    private cashText: Konva.Text;
    private continueButton: Konva.Rect;
    private continueText: Konva.Text;
    private group: Konva.Group;

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
            x: 150,
            y: 100,
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
            //x
            //y
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
            
        })

    }

    private initializeButton(): void {

    }

}