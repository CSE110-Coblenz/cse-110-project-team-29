import "./style.css";
import Konva from "konva";

import { EndOfGameScreenController } from "./EndOfGameScreen/EndOfGameScreenController";
import { mockEndGameData } from "./EndOfGameScreen/EndOfGameScreenModel";

const app = document.getElementById("app") || (() => {
  const d = document.createElement("div");
  d.id = "app";
  document.body.appendChild(d);
  return d;
})();

// 1) crated Konva stage and layer
const stage = new Konva.Stage({
  container: app as HTMLElement,
  width: window.innerWidth,
  height: window.innerHeight,
});
const layer = new Konva.Layer();
stage.add(layer);

// 2) build the EndOfGameScreen
const end = new EndOfGameScreenController(stage.width(), stage.height());
layer.add(end.getGroup());
layer.draw();

// 3) Button exit and play again(just print out)
end.onRequestExit(() => console.log("Exit to Title clicked"));
end.onRequestRetry(() => console.log("Play Again clicked"));

// 4) fake data just for the test
end.showResults(mockEndGameData);

// 5) adjustment
window.addEventListener("resize", () => {
  stage.size({ width: window.innerWidth, height: window.innerHeight });
  layer.batchDraw();
});