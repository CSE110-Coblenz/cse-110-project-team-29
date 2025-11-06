import Konva from "konva";
import type { EndGameData } from "../types";

type ClickHandler = () => void;

export class EndOfGameScreenView {
  private group = new Konva.Group({ visible: false });
  private donutLayer = new Konva.Group();
  private barsLayer = new Konva.Group();

  private onRetry?: ClickHandler;
  private onExit?: ClickHandler;

  constructor(stageWidth: number, stageHeight: number) {
    // background
    const card = new Konva.Rect({
      x: stageWidth*0.05, y: stageHeight*0.06,
      width: stageWidth*0.90, height: stageHeight*0.88,
      cornerRadius: 16, fill: "#231415", stroke: "#3d2627", strokeWidth: 1
    });
    const title = new Konva.Text({
      x: card.x()+20, y: card.y()+14, text: "Your Final Score",
      fontSize: 22, fontStyle: "bold", fill: "#f7f2ee"
    });

    // different layer
    this.group.add(card, title, this.donutLayer, this.barsLayer);

    // button
    const btnY = card.y() + card.height() - 56;
    const mkBtn = (x: number, label: string) => {
      const w = 150, h = 40;
      const btn = new Konva.Group({ x, y: btnY });
      const bg = new Konva.Rect({
        width: w, height: h, cornerRadius: 12,
        fill: label.includes("Play") ? "#6b3a20" : "#3a2426",
        stroke: label.includes("Play") ? "#8b4a2a" : "#573233", strokeWidth: 1
      });
      const tx = new Konva.Text({
        text: label, width: w, height: h, align: "center",
        verticalAlign: "middle", fill: "#fff", fontSize: 16
      });
      btn.add(bg, tx);
      btn.on("mouseenter", () => { document.body.style.cursor = "pointer"; });
      btn.on("mouseleave", () => { document.body.style.cursor = "default"; });
      return btn;
    };

    const btnRetry = mkBtn(card.x()+card.width()-320, "Play Again");
    const btnExit  = mkBtn(card.x()+card.width()-160, "Exit to Title");
    btnRetry.on("click", () => this.onRetry?.());
    btnExit.on("click", () => this.onExit?.());
    this.group.add(btnRetry, btnExit);
  }

  getGroup() { return this.group; }
  show() { this.group.visible(true); }
  hide() { this.group.visible(false); }

  onRetryClick(cb: ClickHandler) { this.onRetry = cb; }
  onExitClick(cb: ClickHandler)  { this.onExit  = cb; }

  render(data: EndGameData, stageWidth: number, stageHeight: number) {
    // empty
    this.donutLayer.destroyChildren();
    this.barsLayer.destroyChildren();

    // circle
    const cx = stageWidth * 0.30;
    const cy = stageHeight * 0.45;
    const outerR = 90, innerR = 65;
    this.donutLayer.add(new Konva.Arc({ x: cx, y: cy, innerRadius: innerR, outerRadius: outerR, angle: 360, rotation: -90, fill: "#3c2627" }));
    const angle = Math.max(0, Math.min(100, data.accuracy)) / 100 * 360;
    this.donutLayer.add(new Konva.Arc({ x: cx, y: cy, innerRadius: innerR, outerRadius: outerR, angle, rotation: -90, fill: "#ffb703" }));
    this.donutLayer.add(new Konva.Text({ x: cx-60, y: cy-24, width:120, align:"center", text:`${Math.round(data.accuracy)}%`, fontSize:28, fontStyle:"bold", fill:"#f7f2ee"}));
    this.donutLayer.add(new Konva.Text({ x: cx-60, y: cy+4, width:120, align:"center", text:"Accuracy", fontSize:14, fill:"#a08f8f"}));

    // left kpi
    const rightX = stageWidth * 0.58;
    const boxW = 220, boxH = 80, gap = 12;
    const kpis = [
      { t:"Total Questions", v:String(data.totalQuestions) },
      { t:"Correct",         v:String(data.correct) },
      { t:"Incorrect",       v:String(data.incorrect) },
      { t:"Coins",           v:data.coins.toLocaleString() },
    ];
    kpis.forEach((k, i) => {
      const y = 80 + i * (boxH + gap);
      this.donutLayer.add(new Konva.Rect({ x:rightX, y, width:boxW, height:boxH, cornerRadius:12, fill:"#2e1b1c", stroke:"#4a2a2b", strokeWidth:1 }));
      this.donutLayer.add(new Konva.Text({ x:rightX+12, y:y+12, text:k.t, fill:"#a08f8f", fontSize:12 }));
      this.donutLayer.add(new Konva.Text({ x:rightX+12, y:y+34, text:k.v, fill:"#f7f2ee", fontSize:22, fontStyle:"bold" }));
    });

    // bottom table
    const baseX = stageWidth * 0.16, baseY = stageHeight * 0.88;
    const chartW = stageWidth * 0.68, chartH = 180;
    const n = data.performanceByConcept.length, gap2 = 32;
    const barW = Math.min(80, (chartW - gap2*(n-1)) / n);

    data.performanceByConcept.forEach((c, i) => {
      const h = Math.max(0, Math.min(100, c.accuracy))/100 * chartH;
      const x = baseX + i*(barW+gap2), y = baseY - h;
      const rect = new Konva.Rect({
        x, y: baseY, width: barW, height: 0,
        fillLinearGradientStartPoint: {x:0,y}, fillLinearGradientEndPoint:{x:0,y:y+h},
        fillLinearGradientColorStops:[0,"#ffb703",1,"#d08a00"], stroke:"#5a3b1e", strokeWidth:1, cornerRadius:8
      });
      const label = new Konva.Text({ x:x-30, y:baseY+6, width:barW+60, align:"center", text:c.name, fill:"#a08f8f", fontSize:12 });
      const val   = new Konva.Text({ x, y:y-18, width:barW, align:"center", text:`${Math.round(c.accuracy)}%`, fill:"#f7f2ee", fontSize:12 });
      this.barsLayer.add(rect, label, val);
      rect.to({ height:h, y: baseY - h, duration:0.6 });
    });
  }
}