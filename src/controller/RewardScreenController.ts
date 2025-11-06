import { RewardsModel } from "../Models/RewardsModel";
import { RewardsView } from "../views/RewardsView";
import { ScreenController, ScreenSwitcher } from "./ScreenController";


export class RewardScreenController extends ScreenController {
    private model: RewardsModel;
    private view : RewardsView;
    private screenSwitcher: ScreenSwitcher;

    constructor(screenSwitcher: ScreenSwitcher) {
        super();
        this.screenSwitcher = screenSwitcher;
        this.model = new RewardsModel();
        this.view = new RewardsView(() => this.handleContinue());
    }


    private handleContinue(): void {
        this.screenSwitcher.switchToScreen({ type: "act1"});
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
            this.model.resetProgress();
        }
    }


    public getProgress(): number {
        return this.model.getProgress();
    }

    public getCash(): number {
        return this.model.getCash();
    }
    
}