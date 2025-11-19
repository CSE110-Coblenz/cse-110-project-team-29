import './style.css'
import { TableOfContentsView } from './VIEWS/TableOfContentsView';
import { MiniGame2Controller } from './CONTROLLER/MiniGame2Controller';
import Konva from 'konva';

class App {
//   private layer: Konva.Layer;
  private stage: Konva.Stage;
  private miniGame2Controller: MiniGame2Controller

  constructor(container: string) {
		// Initialize Konva stage (the main canvas)
		this.stage = new Konva.Stage({
			container,
			width: 1200,
			height: 733,
		});

		// import CONTROLLER, holds both MODEL and VIEW
		this.miniGame2Controller = new MiniGame2Controller(this.stage);
		let view = this.miniGame2Controller.getView();
		
		
		// this.layer = new Konva.Layer();	

		// this.layer.add(new TableOfContentsView().getGroup());
		
		// this.stage.add(this.layer);
		
		
		this.stage.add(view.getLayer());
		// this.layer.draw();
	}
}

new App('app');