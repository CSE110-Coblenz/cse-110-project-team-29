import { AppScreenSwitcher } from "./controller/AppScreenSwitcher";
import { ActModels } from "./models/GenericActModel.ts";

function main() {
    const switcher = new AppScreenSwitcher(ActModels.getInstance().getQuestions());
    switcher.switchToScreen({ type: "act1" });
}

main();
