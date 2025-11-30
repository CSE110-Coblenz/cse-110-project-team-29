import { Minigame1Controller } from "./controller/Minigame1ScreenController.ts";
import { Minigame1View } from "./views/Minigame1ScreenView.ts";

function main() {
    const controller =  new Minigame1Controller()
    const view = new Minigame1View(controller);
    view.show();
}

main();