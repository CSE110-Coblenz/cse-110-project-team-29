import Konva from "konva";
import type { View } from "./View";
import { STAGE_WIDTH, STAGE_HEIGHT } from "../constants";

/**
 * TitleScreenView - Renders the title screen
 */
export class TitleScreenView implements View {
	private group: Konva.Group;

	constructor(onStartClick: () => void) {
		this.group = new Konva.Group({ visible: true });

		// Background
		Konva.Image.fromURL("act1Background.png", (bg) => {
			bg.x(0);
			bg.y(0);
			bg.width(STAGE_WIDTH);
			bg.height(STAGE_HEIGHT);

			this.group.add(bg);
			bg.moveToBottom();
		});
	
		// Title text
		const title = new Konva.Text({
			x: STAGE_WIDTH / 2,
			y: STAGE_HEIGHT / 3,
			text: "WELCOME TO HOUSE OF ODDS",
			fontSize: 48,
			fontFamily: "Jomolhari",
			fill: "white",
			stroke: "white",
			strokeWidth: 1,
			align: "center",
		});
		// Center the text using offsetX
		title.offsetX(title.width() / 2);
		this.group.add(title);

		const startButtonGroup = new Konva.Group();
		// Start button
		const startButton = new Konva.Rect({
			x: STAGE_WIDTH / 2,
			y: STAGE_HEIGHT / 2,
			width: 240,
			height: 80,
			offsetX: 120,
			fill: "#36151b",
			stroke: "white",
			strokeWidth: 1,
		});
		startButton.cornerRadius(startButton.height() / 2)
		startButton.offsetX(startButton.width() / 2);

		// Start text
		const startText = new Konva.Text({
			x: STAGE_WIDTH / 2,
			y: STAGE_HEIGHT / 2,
			text: "START",
			fontSize: 40,
			fontFamily: "Jomolhari",
			fill: "white",
			align: "center",
		});
		startText.offsetX(startText.width() / 2);
		startText.offsetY((startText.fontSize() - startButton.height()) / 2)

		startButtonGroup.add(startButton);
		startButtonGroup.add(startText);
		startButtonGroup.on("click", onStartClick);
		this.group.add(startButtonGroup);
	}

	/**
	 * Show the screen
	 */
	show(): void {
		this.group.visible(true);
		this.group.getLayer()?.draw();
	}

	/**
	 * Hide the screen
	 */
	hide(): void {
		this.group.visible(false);
		this.group.getLayer()?.draw();
	}

	getGroup(): Konva.Group {
		return this.group;
	}
}
