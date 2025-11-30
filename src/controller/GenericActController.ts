import type { AppScreenSwitcher } from "./AppScreenSwitcher.ts";
import { ScreenController } from "./ScreenController.ts";
import { RewardsModel } from "../models/RewardsModel.ts";

export class GenericActController extends ScreenController {

    private nextScreen: () => void;
    private view: any;
    private questions!: { question: string; answer: string }[]; 
    private currentIndex: number
    private screenSwitcher: AppScreenSwitcher;

    constructor(
        screenSwitcher: AppScreenSwitcher,
        nextScreen: () => void,
        questions: { question: string; answer: string }[],
        ViewClass: new () => any,
        resumeIndex: number
    ) {
        super();
        this.screenSwitcher = screenSwitcher;
        this.nextScreen = nextScreen;
        this.questions = questions;
        this.view = new ViewClass();
        this.currentIndex = resumeIndex;
        this.view.onSubmit(this.handleAnswer.bind(this));
    }

    async init() {
        //Only Shows the Tutorial at question 1
        if (this.currentIndex === 0 && this.view.startTutorial) {
            const tutorialImg = this.getTutorialImagesForAct();

            if(tutorialImg && tutorialImg.length > 0){
                this.view.startTutorial(tutorialImg, () => {
                    this.showQuestion();
                });
                return
            }
        
        }   
            this.showQuestion();
    }

    getView() {
        return this.view;
    }

    private showQuestion() {
         const q = this.questions[this.currentIndex];

         if (!q) {
             console.log("No more questions. Moving to next screen.");
             this.nextScreen();
             return;
        }

        this.view.updateQuestion(q.question);
    }


    private handleAnswer(answer: string) {
        const q = this.questions[this.currentIndex];
        if (!q) return;

        const normalize = (s: string) => s.replace(/\s/g, "").toLowerCase();
        const isCorrect = normalize(answer) === normalize(q.answer);

        const returnTo = this.screenSwitcher.getCurrentAct();

        if (isCorrect) {
            RewardsModel.getInstance().addCorrect(returnTo);
        }

        this.screenSwitcher.switchToScreen({
            type: "rewards",
            isCorrect,
            returnTo, 
            nextIndex: this.currentIndex + 1
        });

    }

    private getTutorialImagesForAct(): string[] {
    const act = this.screenSwitcher.getCurrentAct();

    switch (act) {
        case "act1":
            return [
                "./Act1-1.png",
                "./Act1-2.png"
            ];
        case "act2":
            return [
                "./Act2-1.png",
                "./Act2-2.png",
                "./Act2-3.png"
            ];
        case "act3":
            return [
                "./Act3-1.png",
                "./Act3-2.png"
            ];
        default:
            return [];
    }
}
}
