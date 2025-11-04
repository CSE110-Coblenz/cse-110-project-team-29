
import { RewardsModel } from "./RewardsModel";
import { RewardsView } from "./RewardsView";


export class RewardScreenController {
    private model : RewardsModel;
    private view : RewardsView | null = null;

    constructor(model : RewardsModel) {
        this.model = model;
    }


    /**
     * Connects the View Model
     * @param view 
     */
    public setView(view: RewardsView): void {
        this.view = view;
    }

    public correctAnswer(rewardAmount: number): void {
        this.model.addCash(rewardAmount);
        this.model.incrementProgress();

        if(this.view) {
            this.view.update();
            this.view.show();
        }
    }

    public continue(): void {
        if (this.view) {
            this.view.hide();
        }

        if(this.model.isActComplete()) {
            
        }
    }


    public getProgress(): number {
        return this.model.getProgress();
    }

    public getCash(): number {
        return this.model.getCash();
    }
    
}