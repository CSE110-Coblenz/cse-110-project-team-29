import { describe, it, expect, vi, beforeEach } from "vitest";
import { RewardsModel } from "../src/models/RewardsModel.ts";

describe("RewardsModelTest", () => {

    let rm : RewardsModel;

    beforeEach(() => {
        rm = RewardsModel.getInstance();
        rm.setCash(0);
    });

    it("should always return the same instance", () => {
      const instance1 = RewardsModel.getInstance();
      const instance2 = RewardsModel.getInstance();
       expect(instance1).toBe(instance2);
     });

    it("correctly get cash", () => {
        expect(rm.getCash()).toEqual(0);

    });

    it("correctly adds cash", () => {
        rm.addCash(10);
        expect(rm.getCash()).toEqual(10);
        rm.addCash(10);
        expect(rm.getCash()).toEqual(20);

    });

    it("correctly set cash", () => {
        rm.setCash(10);
        expect(rm.getCash()).toEqual(10);
    });

    it("correctly substracts cash", () => {
        rm.setCash(20);
        rm.subtractCash(5);
        expect(rm.getCash()).toBe(15);
        rm.subtractCash(10);
        expect(rm.getCash()).toBe(5);

    });
    
});