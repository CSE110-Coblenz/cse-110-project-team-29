import { describe, it, expect, vi, beforeEach } from "vitest";
import { RewardsController } from "../src/controller/RewardScreenController.ts";

const mockShowReward = vi.fn();
const mockHide = vi.fn();
const mockAddCash = vi.fn();

let continueCallback: () => void;

vi.mock("../src/views/RewardsView.ts", () => ({
  RewardsView: vi.fn().mockImplementation(function (onContinue: () => void) {
    continueCallback = onContinue;
    return {
      showReward: mockShowReward,
      hide: mockHide,
    };
  }),
}));

vi.mock("../src/models/RewardsModel.ts", () => ({
  RewardsModel: {
    getInstance: vi.fn(() => ({
      addCash: mockAddCash,
    })),
  },
}));


describe("RewardsController", () => {
  let nextScreen: () => void;

  beforeEach(() => {
    vi.clearAllMocks();
    nextScreen = vi.fn();
  });

  it("calls addCash and showReward when isCorrect is true", () => {
    const controller = new RewardsController(true, nextScreen);
    controller.init();

    expect(mockAddCash).toHaveBeenCalledWith(10000);
    expect(mockShowReward).toHaveBeenCalledWith(true);
  });

  it("does not call addCash but still shows reward when isCorrect is false", () => {
    const controller = new RewardsController(false, nextScreen);
    controller.init();

    expect(mockAddCash).not.toHaveBeenCalled();
    expect(mockShowReward).toHaveBeenCalledWith(false);
  });

  it("handleContinue hides the view and calls nextScreen", () => {
    const controller = new RewardsController(true, nextScreen);
    const view = controller.getView();

    continueCallback();

    expect(mockHide).toHaveBeenCalled();
    expect(nextScreen).toHaveBeenCalled();
  });

  it("getView returns the RewardsView instance", () => {
    const controller = new RewardsController(true, nextScreen);
    const view = controller.getView();

    expect(view).toBeDefined();
    expect(view.showReward).toBe(mockShowReward);
  });
});