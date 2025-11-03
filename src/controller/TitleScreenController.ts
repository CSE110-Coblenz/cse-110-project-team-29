import { ScreenController, ScreenSwitcher } from "./ScreenController";
import { TitleScreenView } from "../views/TitleScreenView.ts";

/**
 * TitleScreenController - Handles title interactions
 */
export class TitleScreenController extends ScreenController {
	private view: TitleScreenView;
	private screenSwitcher: ScreenSwitcher;

	constructor(screenSwitcher: ScreenSwitcher) {
		super();
		this.screenSwitcher = screenSwitcher;
		this.view = new TitleScreenView(() => this.handleStartClick());
	}

	/**
	 * Handle start button click
	 */
	private handleStartClick(): void {
		this.screenSwitcher.switchToScreen({ type: "act1"});
	}

	/**
	 * Get the view
	 */
	getView(): TitleScreenView {
		return this.view;
	}
}
