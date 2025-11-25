import Konva from "konva";
import type { EndGameData, ConceptPerformance } from "../types.ts";
import { EndOfGameScreenModel, mockEndGameData } from "../models/EndOfGameScreenModel.ts";
import { EndOfGameScreenView } from "../views/EndOfGameScreenView.ts";
import { ScreenController } from "./ScreenController.ts";
import type { View } from "../views/View.ts";

// 从大项目里拿题目和金币（不改那边代码）
import { ActModels } from "../models/GenericActModel.ts";
import { RewardsModel } from "../models/RewardsModel.ts";

export class EndOfGameScreenController extends ScreenController {
  private model = new EndOfGameScreenModel();
  private view: EndOfGameScreenView;
  private group: Konva.Group;

  private stage: Konva.Stage;
  private layer: Konva.Layer;

  private onExitToTitle?: () => void;
  private onRetry?: () => void;

  private gameOverSound: HTMLAudioElement | null =
    typeof Audio !== "undefined" ? new Audio("/gameover.mp3") : null;

  constructor(stageWidth: number, stageHeight: number) {
    super();

    // 自己创建 Stage + Layer，复用 "konva-container"
    this.stage = new Konva.Stage({
      container: "konva-container",
      width: stageWidth,
      height: stageHeight,
    });
    this.layer = new Konva.Layer();
    this.stage.add(this.layer);

    this.view = new EndOfGameScreenView(stageWidth, stageHeight);
    this.group = this.view.getGroup();
    this.layer.add(this.group);
    this.layer.draw();

    this.view.onExitClick(() => {
      const rewards = RewardsModel.getInstance();
    
      // 1) 把总金币清零
      rewards.setCash(0);
    
      // 2) 把每个 act 的正确题数清零
      const byAct = rewards.getCorrectByAct();
      byAct.act1 = 0;
      byAct.act2 = 0;
      byAct.act3 = 0;
    
      // 3) 最后再调用外面注入的“回到 title”回调
      this.onExitToTitle?.();
    });

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

  // AppScreenSwitcher 会调用 init()，在这里自动用真实数据渲染
  init() {
    const data = this.buildEndGameData() ?? undefined;
    this.showResults(data);
  }

  // 这里改成：优先用传进来的数据，否则用真实数据，最后才 fallback mock
  showResults(data?: EndGameData) {
    const d = data ?? this.buildEndGameData() ?? mockEndGameData;
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

  // 🔹在你自己这边组装 EndGameData（用大项目里现有的单例）
  private buildEndGameData(): EndGameData | undefined {
    try {
      const acts = ActModels.getInstance().getQuestions();
  
      // 你说 act1=5 题，act2=5 题，act3=3 题；
      // 如果题目数组长度就刚好是这些，也可以直接 acts.actX.length
      const questionsAct1 = acts.act1.length || 5;
      const questionsAct2 = acts.act2.length || 5;
      const questionsAct3 = acts.act3.length || 3;
  
      const totalQuestions = questionsAct1 + questionsAct2 + questionsAct3;
      if (totalQuestions <= 0) return undefined;
  
      const rewards = RewardsModel.getInstance();
      const coins = rewards.getCash();
  
      // 关键：用我们刚才记下来的每个 act 的正确题数
      const { act1: rawAct1, act2: rawAct2, act3: rawAct3 } = rewards.getCorrectByAct();
  
      // 防止越界（比如长度 5 不可能对 6 题）
      const correctAct1 = Math.min(Math.max(rawAct1, 0), questionsAct1);
      const correctAct2 = Math.min(Math.max(rawAct2, 0), questionsAct2);
      const correctAct3 = Math.min(Math.max(rawAct3, 0), questionsAct3);
  
      const correct = correctAct1 + correctAct2 + correctAct3;
      const incorrect = totalQuestions - correct;
      const accuracy = totalQuestions > 0
        ? Math.round((correct / totalQuestions) * 100)
        : 0;
  
      const perf: ConceptPerformance[] = [];
  
      const pushPerf = (name: string, correctCount: number, questionCount: number) => {
        if (questionCount <= 0) return;
        const acc = questionCount > 0
          ? Math.round((correctCount / questionCount) * 100)
          : 0;
        perf.push({ name, accuracy: acc });
      };
  
      pushPerf("Act 1", correctAct1, questionsAct1);
      pushPerf("Act 2", correctAct2, questionsAct2);
      pushPerf("Act 3", correctAct3, questionsAct3);
  
      return {
        totalQuestions,
        correct,
        incorrect,
        coins,
        accuracy,
        performanceByConcept: perf,
      };
    } catch {
      // 出问题就让外面用 mockEndGameData
      return undefined;
    }
  }
}