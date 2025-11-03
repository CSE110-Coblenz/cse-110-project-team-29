import Konva from "konva";
import type { View } from "../../types.ts";
import type { STAGE_WIDTH } from "../../costants.ts"
import type { reward } from "./RewardsModel.ts";

/**
 * Renders the Rewards Screen Popup
 */
export class RewardsView implements View {
    
    private group1: Konva.Group;
    private group2: Konva.Group;
    private rewardsTxt: Konva.Text;
    

    constructor(onContinue: () => void){
        this.group1 = new Konva.Group({visable: false});
        this.group2 = new Konva.Group({visable: false});
        //Main Title Text
        const title = new Konva.Text({
            //x: Stage-Width / 2;
            //y: Stage-Height / 2;
            text: "You Have Gotten the Question Correct!!!",
            font: 48,
            fontFamily: "Jomolhari",
            fill: "Black",
            align: "center"

        });


        const actTitle = new Konva.text({
            //x
            //y
            text: "Act $[] Progress",
            font: 24,
            fontFamily: "Jomolhari",
            fill: "Black",
            
        })

        //Progress Bar
        const BgBar = new Konva.Rect({
            x: 43, //Placeholder Value
            y: 34, //Placeholder Value
            width: 300,
            height: 30,
            fill: "#ffffffff",
            cornerRadius: 10,
        });

        const FgBar = new Konva.Rect({
            x: 43, //Placeholder Value
            y: 34, //Placeholder Value
            width: 0,
            height: 30,
            fill: "#06791fff",
            cornerRadius: 10,
        })



    }


}