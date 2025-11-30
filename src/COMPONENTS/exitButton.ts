import Konva from "konva";

// saves your money, exit button swtiches to act 3 screen

export class ExitButton {
    private group: Konva.Group;
    private popUp: Konva.Group;

    constructor(x: number, y: number, close: () => void) {
        this.group = new Konva.Group();
        const button = new Konva.Group();
        const rect = new Konva.Rect({
            x: x,
            y: y,
            width: 80,
            height: 40,
            fill: 'red',
            stroke: 'black',
            cornerRadius: 10,
            strokeWidth: 2,
        });
        button.add(rect);

        this.group.add(button);

        const text = new Konva.Text({
            x: x + 17,
            y: y + 5,
            text: 'Exit',
            fontSize: 30,
            fontFamily: 'Calibri',
            fill: 'white',
        });
        button.add(text);
        button.addEventListener('mouseover', () => {
            document.body.style.cursor = 'pointer';
            rect.fill('darkred');
        });
        button.addEventListener('mouseout', () => {
            document.body.style.cursor = 'default';
            rect.fill('red');
        });

        this.popUp = new Konva.Group();
        this.popUp.hide();
        const popRect = new Konva.Rect({
            x: x - 240,
            y: y,
            width: 220,
            height: 110,
            fill: 'white',
            stroke: 'black',
            strokeWidth: 2,
        });
        this.popUp.add(popRect);
        const popText = new Konva.Text({
            x: x - 218,
            y: y + 10,
            text: 'Do you want to \ncontinue to Act 3?',
            align: 'center',
            fontSize: 24,
            fontFamily: 'Calibri',
            fill: 'black',
        });
        this.popUp.add(popText);
        const yesbox = new Konva.Group();
        const ybox = new Konva.Rect({
            x: x - 200,
            y: y + 65,
            width: 60,
            height: 30,
            fill: 'red',
            stroke: 'black',
            cornerRadius: 10,
            strokeWidth: 2,
        });         
        const yText = new Konva.Text({
            x: x - 186,
            y: y + 67,
            text: 'Yes',
            align: 'center',
            fontSize: 24,
            fontFamily: 'Calibri',
            fill: 'white',
        });
        yesbox.add(ybox);
        yesbox.add(yText);
        this.popUp.add(yesbox);
        const noBox = new Konva.Group();
        const nbox = new Konva.Rect({
            x: x - 120,
            y: y + 65,            
            width: 60,
            height: 30,
            fill: 'red',
            stroke: 'black',
            cornerRadius: 10,
            strokeWidth: 2,
        });
        const nText = new Konva.Text({
            x: x - 104,
            y: y + 67,
            text: 'No',
            align: 'center',
            fontSize: 24,
            fontFamily: 'Calibri',
            fill: 'white',
        });
        noBox.add(nbox);
        noBox.add(nText);
        this.popUp.add(noBox);
        // this.group.add(this.popUp);

        this.group.addEventListener('click', () => {
            this.popUp.show();
        });

        // yes box events
        yesbox.addEventListener('mouseover', () => {
            document.body.style.cursor = 'pointer';
            ybox.fill('darkred');
        });
        yesbox.addEventListener('mouseout', () => {
            document.body.style.cursor = 'default';
            ybox.fill('red');
        });
        yesbox.addEventListener('click', () => {
            close();
            console.log("Exiting to Act 3");
        });

        // no box events
        noBox.addEventListener('mouseover', () => {
            document.body.style.cursor = 'pointer';
            nbox.fill('darkred');
        });
        noBox.addEventListener('mouseout', () => {
            document.body.style.cursor = 'default';
            nbox.fill('red');
        });
        noBox.addEventListener('click', () => {
            this.popUp.hide();
            console.log("Stayed in MiniGame2");
        });
    }

    public getGroup(): Konva.Group {
        return this.group;
    }

    public getPopUp(): Konva.Group {
        return this.popUp;
    }
}