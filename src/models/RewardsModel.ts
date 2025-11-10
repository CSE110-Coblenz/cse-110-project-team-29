// RewardsModel.ts
export class RewardsModel {
  private static instance: RewardsModel | null = null;
  private totalCash = 0;

  // Private constructor so no one can create instances directly
  private constructor() {}

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
}
