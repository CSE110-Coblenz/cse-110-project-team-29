import { describe, it, expect, beforeEach } from "vitest";
import { EndOfGameScreenModel, mockEndGameData } from "../src/models/EndOfGameScreenModel.ts";
import type { EndGameData } from "../src/types.ts";

describe("EndOfGameScreenModel", () => {
  let model: EndOfGameScreenModel;

  beforeEach(() => {
    model = new EndOfGameScreenModel();
  });

  it("returns mock data by default when no data is set", () => {
    const data = model.getData();
    expect(data).toEqual(mockEndGameData);
  });

  it("returns the data that was set with setData()", () => {
    const customData: EndGameData = {
      totalQuestions: 10,
      correct: 7,
      incorrect: 3,
      coins: 1500,
      accuracy: 70,
      performanceByConcept: [
        { name: "Basic Probability", accuracy: 80 },
        { name: "Conditional", accuracy: 60 },
      ],
    };

    model.setData(customData);
    const data = model.getData();
    expect(data).toEqual(customData);
  });

  it("falls back to mock data again after clear()", () => {
    const customData: EndGameData = {
      totalQuestions: 5,
      correct: 5,
      incorrect: 0,
      coins: 500,
      accuracy: 100,
      performanceByConcept: [
        { name: "Normal", accuracy: 100 },
      ],
    };

    model.setData(customData);
    model.clear();

    const data = model.getData();
    expect(data).toEqual(mockEndGameData);
  });
});
