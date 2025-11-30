import Konva from "konva";
import { SignInput } from "../components/signInput";
import { RewardPop } from "../components/RewardPop";
import { ExitButton } from "../components/exitButton";
import { RewardsModel } from "../models/RewardsModel";
import type { result } from "../TYPES/value";
import type { View } from "./View";
export class MiniGame2View implements View{

    private layer: Konva.Layer;
    private inputBox: SignInput;
    private moneyText: Konva.Text;
    private rewardPop: RewardPop;
    private exitButton: ExitButton;

    // TODO
    constructor(stage: Konva.Stage) {
    
        // Init main layer
        this.layer = new Konva.Layer();


        // Add background
        const background = new Konva.Rect({
			x: 0,
			y: 0,
			width: stage.width(),
			height: stage.height(),

			fillRadialGradientStartPoint: { x: 0, y: stage.height() + 162 },
			fillRadialGradientStartRadius: 0, // gradient starts at a point
			fillRadialGradientEndPoint: { x: stage.width() / 2.9, y: stage.height() / 1.1 },
			fillRadialGradientEndRadius: Math.max(stage.width(), stage.height()) / 1.3,

			fillRadialGradientColorStops: [
				0, '#24c675ff',   // center color
				1, '#000000'    // outer color
			]
        });
        this.layer.add(background);


        // Add exit button component
        this.exitButton = new ExitButton(1175, 20, this.hide.bind(this));
        this.layer.add(this.exitButton.getGroup());
        this.layer.add(this.exitButton.getPopUp());


        // Add roulette circle component
        const circle = new Konva.Circle({
            x: 340,
            y: 370,
            radius: 250,
            fill: 'red',
            stroke: 'black',
            strokeWidth: 4,
        });
        this.layer.add(circle);


        // Add money text
        this.moneyText = new Konva.Text({
            x: -350,
            y: 20, // moved down
            width: stage.width(),
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


        // Add sign component
        this.inputBox = new SignInput(675, 150);
        this.layer.add(this.inputBox.getSignInput());


        // Add reward pop-up component
        this.rewardPop = new RewardPop(180, 50, this.closeReward.bind(this));
        this.layer.add(this.rewardPop.getGroup());


        //default hide this view upon construction
        this.hide();
        
    }

    // passed CONTROLLER function to VIEW input submit event handler
    public bindSubmit(handler: (bet: number) => void) {
        //after some time to "spin" and then pop
        this.inputBox.onSubmit(handler);
    }

    // VIEW show
    show(): void {
        this.layer.show();       
        this.inputBox.showInputBox();
    }

    // VIEW hide
    hide(): void {
        this.layer.hide();    
        this.inputBox.hideInputBox();
    }

    // reward pop-up
    public popReward(result: result): void {
        this.rewardPop.showResult(result);
        this.inputBox.hideInputBox();
        this.rewardPop.getGroup().show();
    }
    public closeReward(): void {
        this.rewardPop.getGroup().hide();
        this.inputBox.showInputBox();
    }

    // Getters
    public getInputBox(): SignInput {
        return this.inputBox;
    }
    public getLayer(): Konva.Layer {
        return this.layer;
    }
    public getGroup(): Konva.Group {
        return new Konva.Group();
    }
}