import Konva from "konva";
import type { View } from "./View";
import { STAGE_HEIGHT, STAGE_WIDTH } from "../constants";
import { Group } from "konva/lib/Group";
import { RewardScreenController } from "../controller/RewardScreenController";

/**
 * Rewards View Model
 */
export class RewardsView implements View {
    private group: Konva.Group;
    private cashText: Konva.Text;
    private barFg: Konva.Rect;

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
        const barBg = new Konva.Rect({
            x: STAGE_WIDTH / 2,
            y: STAGE_HEIGHT / 2 - 100,
            width: 400,
            height: 20,
            fill: "#7e7a7aff",
            cornerRadius: 10,
        });
        

        this.barFg = new Konva.Rect({
            x: STAGE_WIDTH / 2,
            y: STAGE_HEIGHT / 2 - 100,
            width: 0,
            height: 20,
            fill: "#07721eff",
            cornerRadius: 10,
        });

        barGroup.add(barBg);
        barGroup.add(this.barFg);

        this.group.add(barGroup);
    }


    //Update Code For Progress and Cash
    updateCash(cash: number): void {
        this.cashText.text(`Money Earned: $${cash}`)
    }
    
    updateProgress(progress: number): void {
        const clampProg = Math.max(0, Math.min(progress, 1));

        this.barFg.width(400 * clampProg);

        this.barFg.getLayer()?.batchDraw();
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