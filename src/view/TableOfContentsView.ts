import Konva from 'konva';

console.log("TableOfContentsView loaded");

// Helper class to create a text box with click functionality
class TextBox extends Konva.Group {

    private textBox = new Konva.Group();
    private total: number = 0;
    private locked: boolean = false;
    constructor (content: string, x: number, y: number) {
        super();
        
        // TextBox Background
        const box = new Konva.Rect({
            x: x,
            y: y,
            width: 200,
            height: 100,
            fill: 'white',
            stroke: 'black',
            strokeWidth: 2,
        });
        this.textBox.add(box);

        // TextBox Text
        const text = new Konva.Text({
            x: x + 30,
            y: y + 40,
            text: `${content}: ${this.total}`,
            fontSize: 24,
            fontFamily: 'Calibri',
            fill: 'black',
        });

        // Textbox Event handler
        this.textBox.on('click', () => {
            if (this.locked) return;
            this.total += 1;
            text.setText(`${content}: ${this.total}`);
            console.log(`${content} clicked, total is now ${this.total}`);
            this.textBox.getLayer()?.draw();
        });
        this.textBox.add(text);
    }

    // Helper method to get the text box
    getTextBox(): Konva.Group {
        return this.textBox;
    }
}

// Main Table of Contents Screen View
export class TableOfContentsView {
    private group: Konva.Group;

    
    // Helper method to create a text box with click functionality

    constructor() {

        this.group = new Konva.Group();
        

        const Act1 = new TextBox('Act 1', 20, 20);
        this.group.add(Act1.getTextBox());

        const Act2 = new TextBox('Act 2', 270, 20);
        this.group.add(Act2.getTextBox());

        const Act3 = new TextBox('Act 3', 520, 20);
        this.group.add(Act3.getTextBox());
    }

    
    // Helper method to get the main group
    public getGroup(): Konva.Group {
        return this.group;
    }

}