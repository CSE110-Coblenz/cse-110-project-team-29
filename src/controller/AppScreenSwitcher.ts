import type { ScreenController, Screen } from "./ScreenController";
import { GenericActController } from "./GenericActController";
import { RewardsController } from "./RewardScreenController";
import { Act1View } from "../views/Act1View";
import { Act2View } from "../views/Act2View";
import { Act3View } from "../views/Act3View";

export class AppScreenSwitcher implements ScreenController {
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
                    () => console.log("Game complete"),
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

        }

       if (this.currentController) {
           this.currentController.show();
           this.currentController.init?.();
        }

    }

    getView() {
        return this.currentController?.getView()!;
    }

    show() {
        this.currentController?.show();
    }

    hide() {
        this.currentController?.hide();
    }

    getCurrentAct() {
        return this.currentAct;
    }
}



