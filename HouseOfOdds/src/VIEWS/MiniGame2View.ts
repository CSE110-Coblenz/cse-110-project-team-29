import Konva from "konva";
import { SignInput } from "../COMPONENTS/signInput";
import type { condition } from "../TYPES/value";
export class MiniGame2View {

    private layer: Konva.Layer;
    private text: Konva.Text;



    // TODO
    // private getCondition: () => condition;
    // private spinCallback: (cond: condition, bet: number) => void;
    constructor(stage: Konva.Stage, getCondition? : () => condition, spinCallback?: (cond: condition, bet: number) => void) {
        
        // TODO
        // this.getCondition = getCondition;
        // this.spinCallback = spinCallback;




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





        // TODO
        // create sign input element
        const signInput = new SignInput(650, 150, ??????? , stage);
        this.layer.add(signInput.getSignInput());

        this.text = new Konva.Text({
            x: 370,
            y: 300,
            text: "",
            fontSize: 30,
            fontFamily: 'Arial',
            fill: 'black',
        });
        this.layer.add(this.text);

    }

    // TODO
    // public handleSubmit(bet: number): void {
    //     this.spinCallback(this.getCondition(), bet);
    // }





    public getLayer(): Konva.Layer {
        return this.layer;
    }
}