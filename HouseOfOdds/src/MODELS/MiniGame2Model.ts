export class MiniGame2Model {
    
    private colorList: String[] = ['Red', 'Black', 'Green'];
    private probabilityList: number[] = [
        1,2,3,4,5,6,7,8,9,10,
        11,12,13,14,15,16,17,18,19,20,
        21,22,23,24,25,26,27,28,29,30,
        31,32,33,34,35,36,37,38
    ];

    constructor() {}
    
    public spin(): String {
        const probablity = Math.ceil(Math.random() * this.probabilityList.length);
        console.log(`Probability: ${probablity}`);
        if (probablity <= 18){
            return this.colorList[0];
        }
        else if (probablity <= 36 && probablity > 18) {
            return this.colorList[1];
        }
        else if (probablity > 36) {
            return this.colorList[2];
        }
    
        return "Error occured";
    }

}