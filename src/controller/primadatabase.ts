import { PrismaClient } from "@prisma/client";
import type { Database } from "./databaseinterface.ts";

export class PrismaDatabase implements Database {
  private prisma = new PrismaClient();

  async connect() { await this.prisma.$connect(); }
  async disconnect() { await this.prisma.$disconnect(); }

  async getAllQuestions() {
    return this.prisma.question.findMany();
  }

  async createQuestion(question: string) {
    return this.prisma.question.create({ data: { question } });
  }

  async seed() {
    await this.prisma.question.createMany({
      data: [
        { question: "What is 2 + 2?" },
        { question: "What is the capital of France?" },
        { question: "What color is the sky?" },
      ],
      skipDuplicates: true,
    })
  };
}
