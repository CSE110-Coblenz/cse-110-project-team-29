import './style.css'
import { TableOfContentsView } from './VIEWS/TableOfContentsView';
import Konva from 'konva';

class App {
  private layer: Konva.Layer;
  private stage: Konva.Stage;

  constructor(container: string) {
		// Initialize Konva stage (the main canvas)
		this.stage = new Konva.Stage({
			container,
			width: 1000,
			height: 1000,
		});

	  this.layer = new Konva.Layer();
    this.layer.add(new TableOfContentsView().getGroup());
	  this.stage.add(this.layer);
  

    this.layer.draw();
  }
}

new App('app');