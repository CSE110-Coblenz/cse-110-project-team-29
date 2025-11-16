import Konva from "konva";
import { EndOfGameScreenController } from "./Controller/EndOfGameScreenController";
import { mockEndGameData } from "./Model/EndOfGameScreenModel";
import { STAGE_WIDTH, STAGE_HEIGHT } from "./constants";

// 1) Create container div if not exists
let app = document.getElementById("app");
if (!app) {
  app = document.createElement("div");
  app.id = "app";
  document.body.appendChild(app);
}

// 2) Create stage and layer
const stage = new Konva.Stage({
  container: "app",            
  width: STAGE_WIDTH,
  height: STAGE_HEIGHT,
});

const layer = new Konva.Layer();
stage.add(layer);

// 3) Create End screen
const end = new EndOfGameScreenController(stage.width(), stage.height());
layer.add(end.getGroup());
layer.draw();

// 4) Test callbacks
end.onRequestExit(() => console.log("Exit to Title clicked"));
end.onRequestRetry(() => console.log("Play Again clicked"));

// 5) Show fake data
end.showResults(mockEndGameData);

// 6) Resize
window.addEventListener("resize", () => {
  stage.size({ width: window.innerWidth, height: window.innerHeight });
  layer.batchDraw();
});