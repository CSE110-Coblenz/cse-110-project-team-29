import type { Question } from "../../generated/prisma/client.ts";
export interface Database {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  getAllQuestions(): Promise<Question[]>;
  createQuestion(question: string): Promise<Question>;
  seed(): Promise<void>;

}