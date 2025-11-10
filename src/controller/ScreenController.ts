import type { View } from "../views/View";

export type Screen = 
    | { type: "title" }
    | { type: "tableofContents" }
    | { type: "act1" }
    | { type: "reward" };

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