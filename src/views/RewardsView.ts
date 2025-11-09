import Konva from "konva";
import type { View } from "./View";
import { STAGE_HEIGHT, STAGE_WIDTH } from "../constants";
import { Group } from "konva/lib/Group";

/**
 * Rewards View Model
 */
export class RewardsView implements View {
    private group: Konva.Group;
    
    private cashText: Konva.Text;

    constructor(handleContinue: () => void) {
        //Main Group
        this.group = new Konva.Group({ visible: false });

        //Reward Title
        const title = new Konva.Text({
            x: STAGE_WIDTH / 2,
            y: 100,
            text: "You Have Gotten the Question Correct!!!",
            fontSize: 48,
            fontFamily: "Arial",
            fill: "#000000",
            align: "center",
        });
        title.offsetX(title.width() / 2);
        this.group.add(title);


        //Continue Button Code and Group
        const continueButtonGroup = new Konva.Group();
        const continueButton = new Konva.Rect({
            x: STAGE_WIDTH / 2 - 100,
            y: 300,
            width: 200,
            height: 60,
            fill: "#696969ff",
            cornerRadius: 10,
            stroke: "#ffffff",
            strokeWidth: 3,
        });

        const continueText = new Konva.Text({
            x: STAGE_WIDTH / 2,
            y: 315,
            text: "Continue",
            fontSize: 24,
            fontFamily: "Arial",
            fill: "#000000",
            align: "center",
        });

        continueButton.offsetX(continueButton.width() / 2);
        continueButtonGroup.add(continueButton);
        continueButtonGroup.add(continueText);
        continueButtonGroup.on("click", handleContinue);
        this.group.add(continueButtonGroup);

        //Cash Code
        this.cashText = new Konva.Text({
            x: STAGE_WIDTH / 2,
            y: STAGE_HEIGHT / 2,
            text: "Money Earned: $0",
            fontFamily: "Arial",
            fontSize: 24,
            fill: "#000000",
            align: "center",
        });

        this.group.add(this.cashText);
        

        //Progress Bar Code
        const barGroup = new Konva.Group();
    }


    //Updates the Progress
    updateCash(): void{
        const cash = this.controller.getCash();
        this.cashText.text(`Cash Earned: $${}`)
    }

    /**
     * Shows the Rewards Screen
     */
    show(): void {
        this.group.visible(true);
        this.group.getLayer()?.draw();
    }

    /**
     * Hides the Rewards Screen
     */
    hide(): void {
        this.group.visible(false);
        this.group.getLayer()?.draw();
    }

    getGroup(): Group {
        return this.group;
    }
}