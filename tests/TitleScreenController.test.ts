import { describe, it, expect, vi, beforeEach } from "vitest";
import { TitleScreenController } from "../src/controller/TitleScreenController";
import type { ScreenSwitcher } from "../src/controller/ScreenController";

const mockShow = vi.fn();
const mockHide = vi.fn();

let startClickCallback: () => void;

vi.mock("../src/views/TitleScreenView.ts", () => ({
  TitleScreenView: vi.fn().mockImplementation(function (onStartClick: () => void) {
    startClickCallback = onStartClick;
    return {
      show: mockShow,
      hide: mockHide,
    };
  }),
}));

describe("TitleScreenController", () => {
  let mockScreenSwitcher: ScreenSwitcher;
  let controller: TitleScreenController;

  beforeEach(() => {
    vi.clearAllMocks();
    mockScreenSwitcher = {
      switchToScreen: vi.fn(),
    };
    controller = new TitleScreenController(mockScreenSwitcher);
  });

  it("calls switchToScreen with 'act1' when start button is clicked", () => {
    startClickCallback();

    expect(mockScreenSwitcher.switchToScreen).toHaveBeenCalledWith({
      type: "act1",
    });
  });

  it("getView returns the TitleScreenView instance", () => {
    const view = controller.getView();

    expect(view).toBeDefined();
    expect(view.show).toBe(mockShow);
    expect(view.hide).toBe(mockHide);
  });

  it("show calls the view's show method", () => {
    controller.show();

    expect(mockShow).toHaveBeenCalled();
  });

  it("hide calls the view's hide method", () => {
    controller.hide();

    expect(mockHide).toHaveBeenCalled();
  });
});