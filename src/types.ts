export interface ConceptPerformance { name: string; accuracy: number; } // 0~100
export interface EndGameData {
  totalQuestions: number;
  correct: number;
  incorrect: number;
  coins: number;
  accuracy: number;                 // 0~100
  performanceByConcept: ConceptPerformance[];
}
import Konva from "konva";
// follow ScreenController 
export interface IScreenController {
    getGroup(): Konva.Group;
    show(): void;
    hide(): void;
}

export type value = {
    number: number,
    color: string
}

export type result = {
    payout: number,
    won: boolean
}