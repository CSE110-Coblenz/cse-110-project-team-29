// tests/PrismaDatabase.test.ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import { PrismaDatabase } from "../src/controller/PrismaDatabase";
import { PrismaClient } from "@prisma/client";

// Mock PrismaClient
vi.mock("@prisma/client", () => {
  const mPrisma = {
    $connect: vi.fn(),
    $disconnect: vi.fn(),
    question: {
      findMany: vi.fn(),
      create: vi.fn(),
      createMany: vi.fn(),
    },
  };

  return {
    PrismaClient: vi.fn(function () {
      return mPrisma;
    }),
  };
});


describe("PrismaDatabase", () => {
  let db: PrismaDatabase;
  let mockPrisma: any;

  beforeEach(() => {
    db = new PrismaDatabase();
    mockPrisma = (db as any).prisma;
  });

  it("connects to the database", async () => {
    await db.connect();
    expect(mockPrisma.$connect).toHaveBeenCalled();
  });

  it("disconnects from the database", async () => {
    await db.disconnect();
    expect(mockPrisma.$disconnect).toHaveBeenCalled();
  });

  it("fetches all questions", async () => {
    mockPrisma.question.findMany.mockResolvedValue([{ id: 1, question: "Test?", answer:"test" }]);
    const result = await db.getAllQuestions();
    expect(result).toEqual([{ id: 1, question: "Test?", answer:"test" }]);
  });

  it("creates a question", async () => {
    mockPrisma.question.create.mockResolvedValue({ id: 1, question: "New Q", answer:"test" });
    const result = await db.createQuestion("New Q", "test");
    expect(result).toEqual({ id: 1, question: "New Q" , answer:"test"});
  });

  it("seeds initial questions", async () => {
    await db.seed();
    expect(mockPrisma.question.createMany).toHaveBeenCalled();
  });
});
