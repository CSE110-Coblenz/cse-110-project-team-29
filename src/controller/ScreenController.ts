import type {View} from "../views/View";

export type Screen =
    | { type: "title" }
    | { type: "tableOfContents" }
    | { type: "act1" , resumeIndex?: number | undefined}
    | { type: "act2", resumeIndex?: number | undefined}
    | { type: "act3", resumeIndex?: number | undefined}
    | { type: "rewards"; isCorrect: boolean; returnTo: "act1" | "act2" | "act3";  nextIndex?: number }


export abstract class ScreenController {
    abstract getView(): View;

    show(): void {
        this.getView().show();
    }

    hide(): void {
        this.getView().hide();
    }

    init?(): void;
}

export interface ScreenSwitcher {
    switchToScreen(Screen: Screen): void;
}