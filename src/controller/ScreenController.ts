import type {View} from "../views/View"

export type Screen =
	| { type: "title" }
	| { type: "tableOfContents" }
	| { type: "act1" };

export abstract class ScreenController {
    abstract getView(): View;

    show(): void {
        this.getView().show();
    }

    hide(): void {
        this.getView().hide();
    }
}

export interface ScreenSwitcher {
    switchToScreen(Screen: Screen): void;
}