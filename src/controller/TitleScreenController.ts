import type { AppScreenSwitcher } from "./AppScreenSwitcher.ts";
import { ScreenController } from "./ScreenController";
import { TitleScreenView } from "../views/TitleScreenView";

/**
 * TitleScreenController - Handles title interactions
 */
export class TitleScreenController extends ScreenController {
	private view: TitleScreenView;
	private screenSwitcher: AppScreenSwitcher;

	constructor(screenSwitcher: AppScreenSwitcher) {
		super();
		this.screenSwitcher = screenSwitcher;
		this.view = new TitleScreenView(() => this.handleStartClick());
	}

	/**
	 * Handle start button click
	 */
	private handleStartClick(): void {
		this.view.hide();
		this.screenSwitcher.switchToScreen({ type: "act1"});
	}

	/**
	 * Get the view
	 */
	getView(): TitleScreenView {
		return this.view;
	}
}
