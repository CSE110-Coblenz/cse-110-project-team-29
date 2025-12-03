import Konva from "konva";
export class SignInput extends Konva.Group {
    
    private signInput = new Konva.Group();
    private inputBox: HTMLInputElement;
    private conditionText: Konva.Text;
    private errorText: Konva.Text;

    // Game provides a condition,
    // lets make the user enter the proabablity of the condition
    // and then input how much they want to bet  on that condition
    constructor(x: number, y: number) {
        super();
            
        // create HTML input box
        this.inputBox = document.createElement('input');
        this.inputBox.type = 'text';
        this.inputBox.placeholder = 'Enter bet amount';
        this.inputBox.value = '';
        //styling
        const textPosition = this.signInput.getAbsolutePosition();
        this.inputBox.style.position = 'absolute';
        this.inputBox.style.top =  textPosition.y + 330 + 'px';
        this.inputBox.style.left = textPosition.x + 852 + 'px';
        this.inputBox.style.width =  200 + 'px'
        this.inputBox.style.fontSize = 16 + 'px';
        this.inputBox.style.border = '2px solid #333';
        this.inputBox.style.borderRadius = '4px';
        this.inputBox.style.padding = '4px';
        this.inputBox.style.textAlign = 'center';
        this.inputBox.style.background = '#fff';
        this.inputBox.style.color = '#000';
        const container = document.getElementById('konva-container')
        if (container) {
            container.appendChild(this.inputBox);
        }
        
        // konva group elements
        this.signInput.add(this.createBox(x, y));
        this.conditionText = this.createText(x, y, 24, 'white');
        this.errorText = this.createText(x + 18, y - 160, 40, 'red');
        this.signInput.add(this.conditionText);
        this.signInput.add(this.errorText);
        this.showInputBox();
    }

    getSignInput(): Konva.Group {
        return this.signInput;
    }

    getInputBox(): HTMLInputElement{
        return this.inputBox;
    }

    clearInputBox(): void {
        this.inputBox.value = '';
    }
    
    createBox(x: number, y: number): Konva.Group {
        const box = new Konva.Group();
        const sign = new Konva.Shape({
            x: x,
            y: y,
            sceneFunc: function (context, shape) {
                context.beginPath();
                context.moveTo(0, 150);
                context.lineTo(275, 0);
                context.lineTo(550, 150);
                context.lineTo(275, 300);
                context.closePath();
                context.fillStrokeShape(shape);
                },
                fill: '#e02424',
                stroke: '#ffae00ff',
                strokeWidth: 14,
                
        });
        const rec = new Konva.Rect({
            x: x + 265,
            y: y + 250,
            width: 20,
            height: 400,
            fill: '#d7d7d7ff',
            stroke: 'black',
            strokeWidth: 4
        });
        box.add(rec);
        box.add(sign);
        return box;
    }

    createText(x: number, y: number, fontSize: number, color: string): Konva.Text {
        return new Konva.Text({
            x: x + 168,
            y: y + 90,
            text: '',
            fontSize: fontSize,
            fontFamily: 'Calibri',
            align: 'center',
            verticalAlign: 'middle',
            fill: color,
            opacity: 1,
        });
        
    }

    showInputBox(): void {
        this.inputBox.style.display = 'block';
    }
    hideInputBox(): void {
        this.inputBox.style.display = 'none';
    }

    updateConditionText(cond: string): void {
        this.conditionText.opacity(0);
        this.conditionText.text(`WINNING CONDITION \nThe slot will be: \n>> ${cond} <<`);
        this.conditionText.to({opacity: 1, duration: 0.2});
    }

    updateErrorText(error: string): void {
        this.errorText.setAttr('opacity', 0)
        this.errorText.text(error);
        this.errorText.show();
        this.errorText.getLayer()?.batchDraw();
        this.errorText.to({
            opacity: 1,
            duration: 0.2,
            onFinish: () => {
                setTimeout(() => {

                    this.errorText.to({
                        opacity: 0,
                        duration: 0.2,
                        delay: 2,
                    });
                    this.errorText.hide();
                }, 2000);
            },
        });
    }

    // TODO: pop reward
    onSubmit(handler: (bet: number) => void) {
        
        const inputBox = this.inputBox;
        if (!inputBox) return;
        
        this.signInput.on('click', () => {
            inputBox.focus();
        });

        inputBox.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !inputBox.value) {
                this.updateErrorText("Invalid Bet");
            }
            else if (e.key === 'Enter' && isNaN(parseInt(inputBox.value))) {
                this.updateErrorText("Invalid Bet");
            }
            else if (e.key === 'Enter' && inputBox.value) {
                handler(parseInt(inputBox.value));
            }
        });
    }

}