import { describe, it, expect, vi, beforeEach } from "vitest";
import { TitleScreenController } from "../src/controller/TitleScreenController";
import { ScreenSwitcher } from "../src/controller/ScreenController";
import { TitleScreenView } from "../src/views/TitleScreenView";
import Konva from "konva";

// Mock Konva.Image.fromURL to avoid loading actual images
vi.mock("konva", async () => {
  const actual = await vi.importActual("konva");
  return {
    ...actual,
    Image: {
      ...(typeof actual.Image === "object" ? actual.Image : {}),
      fromURL: vi.fn((url, callback) => {
        const mockImage = new (actual as any).Image();
        callback(mockImage);
      }),
    },
  };
});

describe("TitleScreenController", () => {
  let mockScreenSwitcher: ScreenSwitcher;
  let controller: TitleScreenController;

  beforeEach(() => {
    mockScreenSwitcher = {
      switchToScreen: vi.fn(),
    };
    controller = new TitleScreenController(mockScreenSwitcher);
  });

  it("should create a TitleScreenController instance", () => {
    expect(controller).toBeDefined();
  });

  it("should switch to 'act1' screen when start button is clicked", () => {
    (controller as any).handleStartClick();
    expect(mockScreenSwitcher.switchToScreen).toHaveBeenCalledWith({
      type: "act1",
    });
  });

  it("should return a view from getView()", () => {
    const view = controller.getView();
    expect(view).toBeDefined();
    expect(view).toBeInstanceOf(TitleScreenView);
  });

  it("should show the view when show() is called", () => {
    const view = controller.getView();
    const showSpy = vi.spyOn(view, "show");
    controller.show();
    expect(showSpy).toHaveBeenCalled();
  });

  it("should hide the view when hide() is called", () => {
    const view = controller.getView();
    const hideSpy = vi.spyOn(view, "hide");
    controller.hide();
    expect(hideSpy).toHaveBeenCalled();
  });
});

describe("TitleScreenView", () => {
  let mockOnStartClick: ReturnType<typeof vi.fn>;
  let view: TitleScreenView;

  beforeEach(() => {
    mockOnStartClick = vi.fn();
    view = new TitleScreenView(mockOnStartClick as () => void);
  });

  it("should create a Konva Group", () => {
    const group = view.getGroup();
    expect(group).toBeDefined();
    expect(group).toBeInstanceOf(Konva.Group);
  });

  it("should be visible by default", () => {
    const group = view.getGroup();
    expect(group.visible()).toBe(true);
  });

  it("should show the group when show() is called", () => {
    view.hide();
    expect(view.getGroup().visible()).toBe(false);
    view.show();
    expect(view.getGroup().visible()).toBe(true);
  });

  it("should hide the group when hide() is called", () => {
    view.show();
    expect(view.getGroup().visible()).toBe(true);
    view.hide();
    expect(view.getGroup().visible()).toBe(false);
  });

  it("should call onStartClick callback when start button is clicked", () => {
    const group = view.getGroup();
    const startButtonGroup = group.children?.[2]; // Start button group is the third child

    if (startButtonGroup) {
      startButtonGroup.fire("click");
      expect(mockOnStartClick).toHaveBeenCalled();
    }
  });

  it("should have text elements in the group", () => {
    const group = view.getGroup();
    const textElements = group.find("Text");
    expect(textElements.length).toBeGreaterThan(0);
  });

  it("should render title text with correct content", () => {
    const group = view.getGroup();
    const textElements = group.find("Text");
    const titleText = textElements.find(
      (t) => (t as any).text && (t as any).text().includes("WELCOME")
    );
    expect(titleText).toBeDefined();
  });

  it("should render start button text", () => {
    const group = view.getGroup();
    const textElements = group.find("Text");
    const startText = textElements.find(
      (t) => (t as any).text && (t as any).text() === "START"
    );
    expect(startText).toBeDefined();
  });
});