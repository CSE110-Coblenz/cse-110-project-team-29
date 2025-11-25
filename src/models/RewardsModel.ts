// RewardsModel.ts
export class RewardsModel {
  private static instance: RewardsModel | null = null;
  private totalCash = 0;

  // Private constructor so no one can create instances directly
  private constructor() {}

  private correctByAct: { act1: number; act2: number; act3: number } = {
    act1: 0,
    act2: 0,
    act3: 0,
  };

  // Global access point
  public static getInstance(): RewardsModel {
    if (!RewardsModel.instance) {
      RewardsModel.instance = new RewardsModel();
    }
    return RewardsModel.instance;
  }

  // Instance methods
  public addCash(amount: number): void {
    this.totalCash += amount;
  }

  public subtractCash(amount: number): void {
    this.totalCash -= amount;
  }

  public getCash(): number {
    return this.totalCash;
  }

  public setCash(amount: number): void {
    this.totalCash = amount;
  }
  // 记录某个 act 答对了一题
  public addCorrect(act: "act1" | "act2" | "act3"): void {
    this.correctByAct[act]++;
  }

  // 给结算页读统计用
  public getCorrectByAct() {
    return this.correctByAct;
  }
}
