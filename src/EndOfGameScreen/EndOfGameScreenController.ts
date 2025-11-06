import Konva from "konva";
import type { EndGameData, IScreenController } from "../types";
import { EndOfGameScreenModel, mockEndGameData } from "./EndOfGameScreenModel";
import { EndOfGameScreenView } from "./EndOfGameScreenView";

export class EndOfGameScreenController implements IScreenController {
  private model = new EndOfGameScreenModel();
  private view: EndOfGameScreenView;
  private group: Konva.Group;

  private onExitToTitle?: () => void;
  private onRetry?: () => void;

  private gameOverSound: HTMLAudioElement | null =
    typeof Audio !== "undefined" ? new Audio("/gameover.mp3") : null;

  constructor(stageWidth: number, stageHeight: number) {
    this.view = new EndOfGameScreenView(stageWidth, stageHeight);
    this.group = this.view.getGroup();
    this.view.onExitClick(() => this.onExitToTitle?.());
    this.view.onRetryClick(() => this.onRetry?.());
  }

  getGroup() { return this.group; }
  show() { this.view.show(); }
  hide() { this.view.hide(); }

  /** check the data if there is no data use mock data
   */
  showResults(data?: EndGameData) {
    const d = data ?? mockEndGameData;
    this.model.setData(d);
    this.view.render(this.model.getData(), this.group.getStage()!.width(), this.group.getStage()!.height());
    try { this.gameOverSound && (this.gameOverSound.currentTime = 0, this.gameOverSound.play()); } catch {}
    this.show();
  }

  onRequestExit(cb: () => void) { this.onExitToTitle = cb; }
  onRequestRetry(cb: () => void) { this.onRetry = cb; }
}