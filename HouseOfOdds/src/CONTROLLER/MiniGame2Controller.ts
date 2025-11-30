import Konva from "konva";
import { MiniGame2Model } from "../models/MiniGame2Model";
import { MiniGame2View } from "../views/MiniGame2View";
import { ScreenController } from "./ScreenController";
import type { result} from "../TYPES/value";
export class MiniGame2Controller extends ScreenController {
    private model: MiniGame2Model;
    private view: MiniGame2View;

    constructor(stage: Konva.Stage) {
        super();
        this.model = new MiniGame2Model();
        this.view = new MiniGame2View(stage);

        
        //generate first condition and display
        let cond = this.getCondition();
        this.view.getInputBox().updateConditionText(cond);

        stage.add(this.view.getLayer());
        this.show();
        // this.hide();

        this.view.bindSubmit( (bet: number) => {

            const result = this.handleSpin(cond, bet);

            this.view.popReward(result);

            this.view.getInputBox().clearInputBox();
            cond = this.getCondition();
            // generate new condition and update display after each spin
            this.view.getInputBox().updateConditionText(cond);
        });

        
    }
    
    // Helper method to get the view
    public getView(): MiniGame2View {
        return this.view;
    }
    
    // CONTROLLER function to spin the wheel from the MODEL
    public handleSpin(cond: string, bet: number): result {
        const result = this.model.spin(cond, bet);
        // this.view.updateText(result.color.toString());
        return result;
    }
    public getCondition(): string {
        return this.model.getCondition();
    }
}