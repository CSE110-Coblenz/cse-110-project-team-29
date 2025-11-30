import type { Group } from "konva/lib/Group";

export interface View {
    getGroup(): Group;
    show(): void;
    hide(): void;

    //Act Tutorial
    startTutorial?: (images: string[], onFinished: () => void) => void;
    showTutorialImage?: (url: string) => void;
}