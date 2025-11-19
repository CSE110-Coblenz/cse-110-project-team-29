import Konva from "konva";
import { MiniGame2Model } from "../MODELS/MiniGame2Model";
import { MiniGame2View } from "../VIEWS/MiniGame2View";
export class MiniGame2Controller {
    private model: MiniGame2Model;
    private view: MiniGame2View;

    constructor(stage: Konva.Stage) {
        this.model = new MiniGame2Model();
        this.view = new MiniGame2View(stage, () => { this.handleSpin(); });
        
    }
    
    // Helper method to get the view
    public getView(): MiniGame2View {
        return this.view;
    }
    
    // public addGroup(group: Konva.Group): void {
    //     this.view.addGroup(group);
    // }
    
    // CONTROLLER function to spin the wheel from the MODEL
    public handleSpin(): void {
        const result = this.model.spin();
        this.view.updateText(result.toString());
    }

}