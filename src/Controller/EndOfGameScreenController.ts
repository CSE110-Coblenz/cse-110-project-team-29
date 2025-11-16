import Konva from "konva";
import type { EndGameData } from "../types";
import { EndOfGameScreenModel, mockEndGameData } from "../Model/EndOfGameScreenModel";
import { EndOfGameScreenView } from "../views/EndOfGameScreenView";
import { ScreenController } from "./ScreenController";
import type { View } from "../views/View";

export class EndOfGameScreenController extends ScreenController {
  private model = new EndOfGameScreenModel();
  private view: EndOfGameScreenView;
  private group: Konva.Group;

  private onExitToTitle?: () => void;
  private onRetry?: () => void;

  private gameOverSound: HTMLAudioElement | null =
    typeof Audio !== "undefined" ? new Audio("/gameover.mp3") : null;

  constructor(stageWidth: number, stageHeight: number) {
    super(); 

    this.view = new EndOfGameScreenView(stageWidth, stageHeight);
    this.group = this.view.getGroup();

    this.view.onExitClick(() => this.onExitToTitle?.());
    this.view.onRetryClick(() => this.onRetry?.());
  }

  getView(): View {
    return this.view;
  }

  getGroup() {
    return this.group;
  }

  show() {
    super.show();
  }

  hide() {
    super.hide();
  }
  showResults(data?: EndGameData) {
    const d = data ?? mockEndGameData;
    this.model.setData(d);

    const stage = this.group.getStage();
    if (stage) {
      this.view.render(this.model.getData(), stage.width(), stage.height());
    }

    try {
      if (this.gameOverSound) {
        this.gameOverSound.currentTime = 0;
        this.gameOverSound.play();
      }
    } catch {}

    this.show();
  }

  onRequestExit(cb: () => void) { this.onExitToTitle = cb; }
  onRequestRetry(cb: () => void) { this.onRetry = cb; }
}