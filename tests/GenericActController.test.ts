import { describe, it, expect, vi, beforeEach } from "vitest";
import { GenericActController } from "../src/controller/GenericActController.ts";

const mockUpdateQuestion = vi.fn();
const mockOnSubmit = vi.fn();

class MockView {
  updateQuestion = mockUpdateQuestion;
  onSubmit = mockOnSubmit;
}

const mockSwitchToScreen = vi.fn();
const mockGetCurrentAct = vi.fn(() => "act1");

const mockScreenSwitcher = {
  switchToScreen: mockSwitchToScreen,
  getCurrentAct: mockGetCurrentAct,
};

describe("GenericActController", () => {
  let nextScreen: () => void;
  let questions: { question: string; answer: string }[];

  beforeEach(() => {
    vi.clearAllMocks();
    nextScreen = vi.fn();
    questions = [
      { question: "Q1", answer: "A1" },
      { question: "Q2", answer: "A2" },
    ];
  });

  it("initializes and shows the first question", async () => {
    const controller = new GenericActController(
      mockScreenSwitcher as any,
      nextScreen,
      questions,
      MockView,
      0
    );

    await controller.init();

    expect(mockUpdateQuestion).toHaveBeenCalledWith("Q1");
  });

  it("calls nextScreen when there are no more questions", async () => {
    const controller = new GenericActController(
      mockScreenSwitcher as any,
      nextScreen,
      questions,
      MockView,
      5 
    );

    await controller.init();

    expect(nextScreen).toHaveBeenCalled();
  });

  it("handleAnswer calls switchToScreen with correct params when answer is correct", () => {
    const controller = new GenericActController(
      mockScreenSwitcher as any,
      nextScreen,
      questions,
      MockView,
      0
    );

    controller["handleAnswer"]("A1");

    expect(mockSwitchToScreen).toHaveBeenCalledWith({
      type: "rewards",
      isCorrect: true,
      returnTo: "act1",
      nextIndex: 1,
    });
  });

  it("handleAnswer calls switchToScreen with isCorrect=false when answer is wrong", () => {
    const controller = new GenericActController(
      mockScreenSwitcher as any,
      nextScreen,
      questions,
      MockView,
      0
    );

    controller["handleAnswer"]("wrong");

    expect(mockSwitchToScreen).toHaveBeenCalledWith({
      type: "rewards",
      isCorrect: false,
      returnTo: "act1",
      nextIndex: 1,
    });
  });

  it("getView returns the view instance", () => {
    const controller = new GenericActController(
      mockScreenSwitcher as any,
      nextScreen,
      questions,
      MockView,
      0
    );

    const view = controller.getView();

    expect(view).toBeInstanceOf(MockView);
    expect(view.updateQuestion).toBe(mockUpdateQuestion);
  });
});