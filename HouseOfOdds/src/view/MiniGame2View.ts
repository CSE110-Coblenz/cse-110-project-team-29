import Konva from "konva";
import { SignInput } from "../components/signInput";
export class MiniGame2View {

    private layer: Konva.Layer;
    private text: Konva.Text;
    private inputBox: SignInput;
    private moneyText: Konva.Text;



    // TODO
    // private getCondition: () => condition;
    // private spinCallback: (cond: condition, bet: number) => void;
    constructor(stage: Konva.Stage) {
    
        this.layer = new Konva.Layer();

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

        const circle = new Konva.Circle({
            x: 370,
            y: 300,
            radius: 250,
            fill: 'red',
            stroke: 'black',
            strokeWidth: 4,
        });
        this.layer.add(circle);

        this.moneyText = new Konva.Text({
            x: 0,
            y: 60, // moved down
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

        this.text = new Konva.Text({
            x: 370,
            y: 300,
            text: "",
            fontSize: 30,
            fontFamily: 'Arial',
            fill: 'black',
        });
        this.layer.add(this.text);



        // TODO
        // create sign input element
        this.inputBox = new SignInput(675, 150);
        document.body.appendChild(this.inputBox.getInputBox());
        this.layer.add(this.inputBox.getSignInput());



    }

    // passed CONTROLLER function to VIEW input submit event handler
    public bindSubmit(handler: (bet: number) => void) {
        this.inputBox.onSubmit(handler);
    }

    public getInputBox(): SignInput {
        return this.inputBox;
    }

    public updateText(newText: string): void {
        this.text.text(newText);
    }

    public getLayer(): Konva.Layer {
        return this.layer;
    }
}