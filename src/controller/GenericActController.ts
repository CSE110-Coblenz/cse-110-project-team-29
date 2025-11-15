import type { AppScreenSwitcher } from "./AppScreenSwitcher.ts";
import { ScreenController } from "./ScreenController.ts";

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

        this.screenSwitcher.switchToScreen({
            type: "rewards",
            isCorrect,
            returnTo, 
            nextIndex: this.currentIndex + 1
        });

    }
}
