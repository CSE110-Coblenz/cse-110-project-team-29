import { AppScreenSwitcher } from "./controller/AppScreenSwitcher";
import { ActModels } from "./models/GenericActModel";
import { STAGE_WIDTH, STAGE_HEIGHT } from "./constants";

function main() {
    const switcher = new AppScreenSwitcher(ActModels.getInstance().getQuestions());
    switcher.switchToScreen({ type: "act1" });
}

main();
