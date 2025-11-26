import Konva from "konva";
import { MiniGame2Model } from "../MODELS/MiniGame2Model";
import { MiniGame2View } from "../VIEWS/MiniGame2View";
import type { result, condition} from "../TYPES/value";
export class MiniGame2Controller {
    private model: MiniGame2Model;
    private view: MiniGame2View;

    constructor(stage: Konva.Stage) {
        this.model = new MiniGame2Model();
        this.view = new MiniGame2View(stage, this.getCondition.bind(this), (cond: condition, bet: number) => { this.handleSpin(cond, bet); });
        
    }
    
    // Helper method to get the view
    public getView(): MiniGame2View {
        return this.view;
    }

    // public addGroup(group: Konva.Group): void {
    //     this.view.addGroup(group);
    // }
    
    // CONTROLLER function to spin the wheel from the MODEL
    public handleSpin(cond: condition, bet: number): result {
        const result = this.model.spin(cond, bet);
        // this.view.updateText(result.color.toString());
        return result;
    }

    public getCondition(): condition {
        return this.model.getCondition();
    }
}