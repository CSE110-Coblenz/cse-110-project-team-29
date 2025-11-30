import './style.css'
import { MiniGame2Controller } from './controller/MiniGame2Controller';
import Konva from 'konva';

class App {
//   private layer: Konva.Layer;
  private stage: Konva.Stage;
  private miniGame2Controller: MiniGame2Controller

  constructor(container: string) {
		// Initialize Konva stage (the main canvas)
		this.stage = new Konva.Stage({
			container,
			width: 1280,
			height: 720,
		});

		// import CONTROLLER, holds both MODEL and VIEW
		this.miniGame2Controller = new MiniGame2Controller(this.stage);

		this.stage.add(this.miniGame2Controller.getView().getLayer());

		this.miniGame2Controller.show();
		
		// this.layer = new Konva.Layer();	

		// this.layer.add(new TableOfContentsView().getGroup());
		
		// this.stage.add(this.layer);
		
		
	}	
}

new App('app');