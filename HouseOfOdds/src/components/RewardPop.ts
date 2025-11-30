import Konva from 'konva';
import type { result } from "../TYPES/value";
export class RewardPop {
    private group: Konva.Group
    private popText : Konva.Text
    constructor(x : number, y : number, close : () => void) {
        this.group = new Konva.Group();
        let continueButton = new Konva.Group();

        const rect = new Konva.Rect({
            x: x,
            y: y,
            width: 900,
            height: 600,
            fill: 'white',
            stroke: 'black',
            strokeWidth: 2,
        });
        this.group.add(rect);

        this.popText = new Konva.Text({
            x: x + 20,
            y: y + 20,
            text: ``,
            fontSize: 24,
            fontFamily: 'Calibri',
            fill: 'black',
        });
        this.group.add(this.popText);
        const continueBox = new Konva.Rect({
                x: 436,
                y: 420,
                width: 400,
                height: 100,
                cornerRadius: 10,
                fill: 'red',
                stroke: 'black',
                strokeWidth: 2,
        });
        continueButton.add(continueBox);
        const continueText = new Konva.Text({
            x: 545,
            y: 448,
            text: 'Continue',
            fontSize: 45,
            fontFamily: 'Arial',
            fill: 'black',
        })
        continueButton.add(continueText);
        continueButton.addEventListener('click', () => {
            close();
        })
        this.group.add(continueButton);

        this.group.hide();
    }

    showResult(result: result): void {
        result.won ? this.popText.text(`You win $${result.payout}!`) : this.popText.text("You lose!");
    }

    getGroup(): Konva.Group {
        return this.group;
    }
}