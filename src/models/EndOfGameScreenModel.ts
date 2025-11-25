import type { EndGameData } from "../types.ts";

export const mockEndGameData: EndGameData = {
  totalQuestions: 20,
  correct: 16,
  incorrect: 4,
  coins: 3200,
  accuracy: 80,
  performanceByConcept: [
    { name: "Basic Probability", accuracy: 78 },
    { name: "Conditional / Inclusion-Exclusion", accuracy: 62 },
    { name: "Normal Probability", accuracy: 85 },
  ],
};

export class EndOfGameScreenModel {
  private data: EndGameData | null = null;
  setData(d: EndGameData) { this.data = d; }
  getData(): EndGameData { return this.data ?? mockEndGameData; }
  clear() { this.data = null; }
}