import { describe, it, expect, vi, beforeEach } from "vitest";
import { AppScreenSwitcher } from "../src/controller/AppScreenSwitcher.ts";

vi.mock("../src/controller/GenericActController.ts", () => ({
  GenericActController: vi.fn().mockImplementation(function (this: any) {
    this.show = vi.fn();
    this.hide = vi.fn();
    this.init = vi.fn();
    this.getView = vi.fn(() => "MockActView");
  }),
}));


vi.mock("../src/controller/RewardScreenController.ts", () => ({
  RewardsController: vi.fn().mockImplementation(function (this: any) {
    this.show = vi.fn();
    this.hide = vi.fn();
    this.init = vi.fn();
    this.getView = vi.fn(() => "MockRewardsView");
  }),
}));


describe("AppScreenSwitcher Test", () => {
  const questions = {
    act1: [{ question: "Q1", answer: "A1" }],
    act2: [{ question: "Q2", answer: "A2" }],
    act3: [{ question: "Q3", answer: "A3" }],
  };

  let switcher: AppScreenSwitcher;

  beforeEach(() => {
    switcher = new AppScreenSwitcher(questions);
  });

  it("switches to act1 correctly", () => {
    switcher.switchToScreen({ type: "act1" });
    expect(switcher.getCurrentAct()).toBe("act1");
  });

  it("switches to act2 correctly", () => {
    switcher.switchToScreen({ type: "act2" });
    expect(switcher.getCurrentAct()).toBe("act2");
  });

  it("switches to act3 correctly", () => {
    switcher.switchToScreen({ type: "act3" });
    expect(switcher.getCurrentAct()).toBe("act3");
  });


  it("calls hide() on previous controller", () => {

    switcher.switchToScreen({ type: "act1" });
    const firstController = switcher["currentController"]; 
    switcher.switchToScreen({ type: "act2" });
    const secondController = switcher["currentController"];

    expect(firstController?.hide).toHaveBeenCalled();
    expect(secondController?.hide).not.toHaveBeenCalled();

  });

  it("initializes controller with show + init", () => {
    switcher.switchToScreen({ type: "act1" });
    const controller = switcher["currentController"];

    expect(controller?.show).toHaveBeenCalled();
    expect(controller?.init).toHaveBeenCalled();
  });

  it("creates RewardsController", () => {
    switcher.switchToScreen({
      type: "rewards",
      isCorrect: true,
      returnTo: "act1",
      nextIndex: 2,
    });

    const controller = switcher["currentController"];
    expect(controller?.show).toHaveBeenCalled();
    expect(controller?.init).toHaveBeenCalled();
  });

});

