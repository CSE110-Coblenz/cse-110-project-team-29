// RewardsView.ts
import Konva from "konva";
import type { View } from "./View";
import { Group } from "konva/lib/Group";

export class RewardsView implements View {
  private stage: Konva.Stage;
  private layer: Konva.Layer;
  private group: Konva.Group;
  private messageText: Konva.Text;
  private continueButton: Konva.Rect;
  private continueText: Konva.Text;

  constructor(handleContinue: () => void) {
    this.stage = new Konva.Stage({
      container: "konva-container",
      width: window.innerWidth,
      height: window.innerHeight,
    });

    this.layer = new Konva.Layer();
    this.stage.add(this.layer);

    this.group = new Konva.Group({ visible: false });
    this.layer.add(this.group);

    const gradient = new Konva.Rect({
    x: 0,
    y: 0,
    width: this.stage.width(),
    height: this.stage.height(),
    fillLinearGradientStartPoint: { x: 0, y: 0 },
    fillLinearGradientEndPoint: { x: 0, y: this.stage.height() },
    fillLinearGradientColorStops: [
       0, "black",      
       1, "darkred"  
    ]
    });
     this.group.add(gradient);

    // Message text (correct/incorrect)
    this.messageText = new Konva.Text({
      x: this.stage.width() / 4 - 75,
      y: 150,
      text: "",
      fontSize: 48,
      fontFamily: "Arial Black",
      fill: "#ffd700",
      shadowColor: "#000",
      shadowBlur: 10,
      align: "center",
    });
    this.messageText.offsetX(this.messageText.width() / 2);
    this.group.add(this.messageText);

    // Continue button
    this.continueButton = new Konva.Rect({
      x: this.stage.width() / 2 - 120,
      y: 400,
      width: 240,
      height: 70,
      fill: "gold",
      cornerRadius: 12,
      shadowColor: "#000",
      shadowBlur: 10,
      shadowOffset: { x: 0, y: 5 },
      stroke: "#fff",
      strokeWidth: 2,
    });
    this.group.add(this.continueButton);

    this.continueText = new Konva.Text({
      x: this.stage.width() / 2,
      y: 420,
      text: "CONTINUE",
      fontSize: 28,
      fontStyle: "bold italic",
      fontFamily: "Arial",
      fill: "black",
    });

    this.continueText.offsetX(this.continueText.width() / 2);
    this.group.add(this.continueText);

    // Hover effect for button
    this.continueButton.on("mouseenter", () => {
      document.body.style.cursor = "pointer";
      this.continueButton.fill("lightblue");
      this.layer.draw();
    });
    this.continueButton.on("mouseleave", () => {
      document.body.style.cursor = "default";
      this.continueButton.fill("gold");
      this.layer.draw();
    });

    this.continueButton.on("click", handleContinue);
    this.continueText.on("click", handleContinue);

    this.layer.draw();
  }

  showReward(isCorrect: boolean) {
    this.messageText.text(
      isCorrect
        ? "🎉 Correct! You Earned Some Money!"
        : "❌ Incorrect. Better Luck Next Time!"
    );

    this.group.visible(true);
    this.layer.draw();

    // Sparkle effect if correct
    if (isCorrect) {
      for (let i = 0; i < 150; i++) {
        const sparkle = new Konva.Circle({
          x: Math.random() * this.stage.width(),
          y: Math.random() * this.stage.height() / 2,
          radius: 2 + Math.random() * 3,
          fill: "#fffacd",
          opacity: 0.8,
        });
        this.group.add(sparkle);

        sparkle.to({
          y: sparkle.y() + 100,
          opacity: 0,
          duration: 1 + Math.random() * 1.5,
          onFinish: () => sparkle.destroy(),
        });
      }
    }
  }

  show() {
    this.group.visible(true);
    this.layer.draw();
  }

  hide() {
    this.group.visible(false);
    this.layer.draw();
  }

  getGroup(): Group {
    return this.group;
  }
}
