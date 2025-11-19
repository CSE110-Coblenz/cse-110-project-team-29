import Konva from "konva";
import { SignInput } from "../COMPONENTS/signInput";
export class MiniGame2View {

    private layer: Konva.Layer;
    private text: Konva.Text;
    constructor(stage: Konva.Stage, spinCallback: () => void) {
        
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

        // create sign input element
        const signInput = new SignInput(750, 150, spinCallback, stage);
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

        // const spinButton = new Konva.Rect({
        //     x: 370,
        //     y: 500,
        //     width: 200,
        //     height: 100,
        //     fill: 'green',
        //     stroke: 'black',
        //     strokeWidth: 4,
        // });
        // spinButton.on('click', () => {
        //     text.setText(this.model.spin().toString());
        // });
        // this.group.add(spinButton);
        // TODO: fix random seed, deterministic, avoid tricky testing, mocking a probability test (rigged test)
        // this.layer.add(this.group);
        // stage.add(this.layer);
    }

    public updateText(value: string): void {
        this.text.text(value);
    }

    // Helper method to add to main group
    // public addGroupToLayer(group: Konva.Group): void {
    //     this.layer.add(group);
    // }
    
    public getLayer(): Konva.Layer {
        return this.layer;
    }
}