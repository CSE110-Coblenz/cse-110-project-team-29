import Konva from "konva";
export class SignInput extends Konva.Group {
    
    private signInput = new Konva.Group();
    // private signText: Konva.Text;
    private interactFunction: () => void;

    //TODO: finish creating UI components
    //TODO: add the roulette funcitonality
    // Game provides a condition,
    // lets make the user enter the proabablity of the condition
    // and then input how much they want to bet on that condition
    constructor(x: number, y: number, submitInteraction: () => void, stage: Konva.Stage) {
        super();

        // create HTML input box
        this.enableEditing(stage);

        // set interaction
        this.interactFunction = submitInteraction;
        
        // add box shape to group
        this.signInput.add(this.createBox(x, y));
        
    }

    // Helper method to get the sign input box
    getSignInput(): Konva.Group {
        return this.signInput;
    }

    // create the look/shape of the box
    createBox(x: number, y: number): Konva.Group {
        const box = new Konva.Group();
        const sign = new Konva.Shape({
            x: x,
            y: y,
            sceneFunc: function (context, shape) {
                context.beginPath();
                context.moveTo(0, 100);
                context.lineTo(200, 0);
                context.lineTo(400, 100);
                context.lineTo(200, 200);
                context.closePath();
                context.fillStrokeShape(shape);
                },
                fill: '#e02424',
                stroke: 'black',
                strokeWidth: 4
        });
        box.add(sign);
        return box;
    }

    // create the HTML input box and functionality
    enableEditing(stage: Konva.Stage): void {

        // this is the text for the actual Konva group obj
        // const textNode = this.signText;

        const container = stage.container();

        const textPosition = this.signInput.getAbsolutePosition();
        const stageBox = container.getBoundingClientRect();

        // this is an HTML input box not the Konva group obj
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Enter condition text';
        input.value = '';
        input.style.position = 'absolute';
        input.style.top = stageBox.top + textPosition.y + 270 + 'px';
        input.style.left = stageBox.left + textPosition.x + 875 + 'px';
        input.style.width =  200 + 'px'
        input.style.fontSize = 16 + 'px';
        input.style.border = '2px solid #333';
        input.style.borderRadius = '4px';
        input.style.padding = '4px';
        input.style.textAlign = 'center';
        input.style.zIndex = '100';
        input.style.background = '#fff';
        input.style.color = '#000';
        container.appendChild(input);

        // TODO: change to submit numbers, implement game logic
        this.signInput.on('click', () => {
            input.focus();
        });
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') this.interactFunction();
        });
    }
}
