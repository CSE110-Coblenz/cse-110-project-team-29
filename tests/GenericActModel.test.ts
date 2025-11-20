import { describe, it, expect, beforeEach } from "vitest";
import { ActModels } from "../src/models/GenericActModel.ts";

describe("ActModels Test", () => {
  
  it("should always return the same instance", () => {
    const instance1 = ActModels.getInstance();
    const instance2 = ActModels.getInstance();

    expect(instance1).toBe(instance2);
  });

  it("should have all three acts defined", () => {
    const instance = ActModels.getInstance();
    const questions = instance.getQuestions();
    expect(questions).toHaveProperty("act1");
    expect(questions).toHaveProperty("act2");
    expect(questions).toHaveProperty("act3");
  });

  it("each act should contain at least one question", () => {
    const instance = ActModels.getInstance();
    const questions = instance.getQuestions();
    expect(questions.act1.length).toBeGreaterThan(0);
    expect(questions.act2.length).toBeGreaterThan(0);
    expect(questions.act3.length).toBeGreaterThan(0);
  });

  it("each question should have a question and answer string", () => {
    const instance = ActModels.getInstance();
    const { act1, act2, act3 } = instance.getQuestions();

    const validateQuestions = (qs: any[]) => {
      qs.forEach((q) => {
        expect(q).toHaveProperty("question");
        expect(q).toHaveProperty("answer");
        expect(typeof q.question).toBe("string");
        expect(typeof q.answer).toBe("string");
      });
    };

    validateQuestions(act1);
    validateQuestions(act2);
    validateQuestions(act3);
  });

  it("getActQuestions should return the correct act array", () => {
    const instance = ActModels.getInstance();
    const act1 = instance.getActQuestions("act1");
    const act2 = instance.getActQuestions("act2");
    const act3 = instance.getActQuestions("act3");
    expect(Array.isArray(act1)).toBe(true);
    expect(Array.isArray(act2)).toBe(true);
    expect(Array.isArray(act3)).toBe(true);
    expect(act1).toEqual(instance.getQuestions().act1);
    expect(act2).toEqual(instance.getQuestions().act2);
    expect(act3).toEqual(instance.getQuestions().act3);
  });

  it("should throw or fail if invalid act key is used (TypeScript should prevent this)", () => {
     const instance = ActModels.getInstance();
     // @ts-expect-error -- invalid key on purpose
     const result = instance.getActQuestions("invalidAct");
     expect(result).toBeUndefined();
  });
});

