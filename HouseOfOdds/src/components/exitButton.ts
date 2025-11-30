import Konva from "konva";

export class ExitButton {
    private group = new Konva.Group();

    constructor(x: number, y: number) {
        const rect = new Konva.Rect({
            x: x,
            y: y,
            width: 80,
            height: 50,
            fill: 'red',
            stroke: 'black',
            cornerRadius: 10,
            strokeWidth: 2,
        });
        this.group.add(rect);

        const text = new Konva.Text({
            x: x + 17,
            y: y + 10,
            text: 'Exit',
            fontSize: 30,
            fontFamily: 'Calibri',
            fill: 'white',
        });
        this.group.add(text);
    }

    public getGroup(): Konva.Group {
        return this.group;
    }
}