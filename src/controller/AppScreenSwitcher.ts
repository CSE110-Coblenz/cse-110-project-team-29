import { ScreenController, type Screen, type ScreenSwitcher } from "./ScreenController.ts";
import { TitleScreenController } from "./TitleScreenController.ts";
import { GenericActController } from "./GenericActController.ts";
import { RewardsController } from "./RewardScreenController.ts";
import { Act1View } from "../views/Act1View.ts";
import { Act2View } from "../views/Act2View.ts";
import { Act3View } from "../views/Act3View.ts";
import { EndOfGameScreenController } from "./EndOfGameScreenController.ts";

export class AppScreenSwitcher implements ScreenSwitcher {
    private currentController: ScreenController | null = null;
    private currentAct: "act1" | "act2" | "act3" = "act1";
    private questions: {
        act1: { question: string; answer: string }[];
        act2: { question: string; answer: string }[];
        act3: { question: string; answer: string }[];
    };

    constructor(questions: { act1: { question: string; answer: string }[], act2: { question: string; answer: string }[], act3: { question: string; answer: string }[]}) {
        this.questions = questions;
    }

    switchToScreen(screen: Screen) {

        this.currentController?.hide();

        switch (screen.type) {
            case "title":
                this.currentController = new TitleScreenController(this);
                break;

            case "act1":
                this.currentAct = "act1";
                this.currentController = new GenericActController(
                    this,
                    () => this.switchToScreen({type: "act2"}),
                    this.questions.act1,
                    Act1View,
                    screen.resumeIndex ?? 0
                );
                break;
            
            case "act2":
                this.currentAct = "act2";
                this.currentController = new GenericActController(
                    this,
                    () => this.switchToScreen({type: "act3"}),
                    this.questions.act2,
                    Act2View,
                    screen.resumeIndex ?? 0
                );
                break;
            
            case "act3":
                this.currentAct = "act3";
                this.currentController = new GenericActController(
                    this,
                    () => this.switchToScreen({ type: "end" }),
                    this.questions.act3,
                    Act3View,
                    screen.resumeIndex ?? 0
                );
                break;

            case "rewards":
                this.currentController = new RewardsController(
                screen.isCorrect,
                () => this.switchToScreen({ type: screen.returnTo , resumeIndex: screen.nextIndex}));
                break;

            case "end":
                const endCtrl     = new EndOfGameScreenController(
                    window.innerWidth,
                    window.innerHeight
                );
                endCtrl.onRequestExit(() => {
                    this.switchToScreen({ type: "title" });
                });
            
                //（可选）Play Again 以后再接，这里先不动
                // endCtrl.onRequestRetry(() => {
                //     this.switchToScreen({ type: "act1", resumeIndex: 0 });
                // });
            
                this.currentController = endCtrl;
                break;

        }

       if (this.currentController) {
           this.currentController.show();
           this.currentController.init?.();
        }

    }

    getCurrentAct() {
        return this.currentAct;
    }
}



