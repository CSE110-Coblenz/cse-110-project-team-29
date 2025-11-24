import { AppScreenSwitcher } from "./controller/AppScreenSwitcher";
import { ActModels } from "./models/GenericActModel";

function main() {
    const switcher = new AppScreenSwitcher(ActModels.getInstance().getQuestions());
    switcher.switchToScreen({ type: "title" });
}

main();
