import { AppScreenSwitcher } from "./controller/AppScreenSwitcher";
import { questions } from "./questions.ts";

function main() {
    const switcher = new AppScreenSwitcher(questions);
    switcher.switchToScreen({ type: "act1" });
}

main();
