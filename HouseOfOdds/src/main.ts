import './style.css'
import { TableOfContentsView } from './VIEWS/TableOfContentsView';
import { MiniGame2View } from './VIEWS/MiniGame2View';
import Konva from 'konva';

class App {
  private layer: Konva.Layer;
  private stage: Konva.Stage;

  constructor(container: string) {
		// Initialize Konva stage (the main canvas)
		this.stage = new Konva.Stage({
			container,
			width: 1200,
			height: 733,
		});
		
		const background = new Konva.Rect({
			x: 0,
			y: 0,
			width: this.stage.width(),
			height: this.stage.height(),

			fillRadialGradientStartPoint: { x: 0, y: this.stage.height() + 162 },
			fillRadialGradientStartRadius: 0, // gradient starts at a point
			fillRadialGradientEndPoint: { x: this.stage.width() / 2.9, y: this.stage.height() / 1.1 },
			fillRadialGradientEndRadius: Math.max(this.stage.width(), this.stage.height()) / 1.3,

			fillRadialGradientColorStops: [
				0, '#24c675ff',   // center color
				1, '#000000'    // outer color
			]
        });
		
		this.layer = new Konva.Layer();
		// this.layer.add(new TableOfContentsView().getGroup());
		this.stage.add(this.layer);
		
		this.layer.add(background);
		this.layer.add(new MiniGame2View(this.stage).getGroup());
		this.layer.draw();
	}
}

new App('app');