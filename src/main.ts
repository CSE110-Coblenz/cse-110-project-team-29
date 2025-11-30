import { Minigame1Controller } from "./controller/Minigame1ScreenController.ts";
import { Minigame1View } from "./views/Minigame1ScreenView.ts";
import { RewardsModel } from "./models/RewardsModel.ts";

function main() {
    let model = RewardsModel.getInstance();
    model.addCash(10000);

    const controller =  new Minigame1Controller()
    const view = new Minigame1View(controller);
    view.show();
}

main();