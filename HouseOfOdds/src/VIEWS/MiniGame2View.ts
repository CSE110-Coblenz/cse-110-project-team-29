import Konva from "konva";

export class SignInput extends Konva.Group {
    
    private signInput = new Konva.Group();
    private signText: Konva.Text;

    //TODO: finish creating UI components
    constructor(x: number, y: number) {
        super();

        const signBox = new Konva.Shape({
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
        this.signInput.add(signBox);

        this.signText = new Konva.Text({
            x: x + 145,
            y: y + 88,
            text: '',
            fontSize: 16,
            fontFamily: 'Arial',
            fill: 'white',
        });
        this.signInput.add(this.signText);
        // this.add(this.signInput);
    }

    // Helper method to get the sign input box
    getSignInput(): Konva.Group {
        return this.signInput;
    }

    enableEditing(stage: Konva.Stage): void {

        // this is the text for the actual Konva group obj
        const textNode = this.signText;

        const container = stage.container();

        const textPosition = this.signInput.getAbsolutePosition();
        const stageBox = container.getBoundingClientRect();

        // this is an HTML input box not the Konva group obj
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Enter condition text';
        input.value = textNode.text();
        input.style.position = 'absolute';
        input.style.top = stageBox.top + textPosition.y + 270 + 'px';
        input.style.left = stageBox.left + textPosition.x + 875 + 'px';
        input.style.width = textNode.width() + 200 + 'px'
        input.style.fontSize = textNode.fontSize() + 'px';
        input.style.border = '2px solid #333';
        input.style.borderRadius = '4px';
        input.style.padding = '4px';
        input.style.textAlign = 'center';
        input.style.zIndex = '100';
        input.style.background = '#fff';
        input.style.color = '#000';
        container.appendChild(input);

        this.signInput.on('click', () => {
            input.focus();

        });

        
        // TODO: change to submit numbers, implement game logic
        function handleSubmit() {
            textNode.text(input.value);
            console.log(`Sign input set to: ${input.value}`);
        }

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') handleSubmit();
        });
    }
}


export class MiniGame2View {
    private group: Konva.Group;
    constructor(stage: Konva.Stage) {

        this.group = new Konva.Group();

        const circle = new Konva.Circle({
            x: 0,
            y: 750,
            radius: 50,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4,
        });
        this.group.add(circle);

        const signInput = new SignInput(750, 150);
        signInput.enableEditing(stage);
        this.group.add(signInput.getSignInput());
    }

    // Helper method to get the main group
    public getGroup(): Konva.Group {
        return this.group;
    }
}