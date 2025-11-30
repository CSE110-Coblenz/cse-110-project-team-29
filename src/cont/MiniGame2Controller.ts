import Konva from "konva";
import { MiniGame2Model } from "../mod/MiniGame2Model";
import { MiniGame2View } from "../view/MiniGame2View";
import { ScreenController } from "../cont/ScreenController";
import { RewardsModel } from "../mod/RewardsModel";
import type { result } from "../type/value";
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

        // add the view's layer to the stage
        // stage.add(this.view.getLayer());


        // this.show(); // DELETE THIS WHEN DONE


        this.view.bindSubmit( (bet: number) => {
            
            // spin the wheel and get result from MODEL
            if (bet > RewardsModel.getInstance().getCash()){
                this.view.getInputBox().updateErrorText("Not enough money!");
                return;
            }
            const result = this.handleSpin(cond, bet);

            RewardsModel.getInstance().addCash(result.payout);
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