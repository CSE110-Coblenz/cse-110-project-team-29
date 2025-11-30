// RewardsController.ts
import { ScreenController } from "../cont/ScreenController.ts";
import { RewardsView } from "../view/RewardsView.ts";
import { RewardsModel } from "../mod/RewardsModel.ts";

export class RewardsController extends ScreenController {

  private view: RewardsView;
  private model: RewardsModel;
  private isCorrect: boolean;
  private nextScreen: () => void;

  constructor(isCorrect: boolean, nextScreen: () => void) {
    super();
    this.isCorrect = isCorrect;
    this.nextScreen = nextScreen;
    this.view = new RewardsView(() => this.handleContinue());
    this.model = RewardsModel.getInstance();

  }

  getView() {
    return this.view;
  }

  init() {
    if (this.isCorrect) {
        this.model.addCash(10000);
    }
    this.view.showReward(this.isCorrect);
  }

  private handleContinue() {
    this.view.hide();
    this.nextScreen();
  }
}

