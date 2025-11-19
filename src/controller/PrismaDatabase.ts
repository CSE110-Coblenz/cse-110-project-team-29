import { PrismaClient } from "@prisma/client";
import type { Database } from "./DatabaseInterface.ts";

export class PrismaDatabase implements Database {
  private prisma = new PrismaClient();

  async connect() { await this.prisma.$connect(); }
  async disconnect() { await this.prisma.$disconnect(); }

  async getAllQuestions() {
    return this.prisma.question.findMany();
  }

  async createQuestion(question: string, answer: string) {
    return this.prisma.question.create({ data: { question, answer} });
  }

  async seed() {
    await this.prisma.question.createMany({
      data: [
        { question: "One of the games here at House of Odds has a 2-sided die, a 4-sided die, and a 6-sided die. What are the odds of rolling a (2+4+6) ?", answer: "1/48" },
        { question: "At the House of Odds, there’s a game where you bet on what suit a random card pulled from a deck of playing cards will be. Cards are pulled without replacement. What are the odds that the card is hearts 3 times in a row? A deck of playing cards has 52 cards and 13 cards of each suit ?", answer:"11/850" },
        { question: "You’ve been trying to find the bathroom on the Casino floor and have gotten lost! There are six doors in front of you, and only one of them is the bathroom. What are the odds that you find the bathroom within 4 tries ?. (Please put your answer as a simplified fraction)", answer:"4/6"},
        { question: "At this table, a dealer rolls two 8-sided dice and people bet on what number the dice total up to. What is the probability that the dice total up to 10", answer: "7/64"},
        { question: "At a game table, a fair spinner is divided into 5 equal sections. What are the odds of spinning the same number twice in a row? (Please put your answer as a simplified fraction)", answer:"1/5"},

        { question: "At this table in the House of Odds, you roll both a 6 sided dice and 8 sided dice. You win if there is at least one 5 or if the total is above 5. Your total odds of winning are? (Please put your answer as a simplified fraction)", answer:"19/24"},
        { question: "At another table, you roll two 6-sided dice and you win if you get the max possible roll. Using your dice skills, you’re able to guarantee that at least one of the dice will be an 6. What are the odds that you win?", answer:"1/11"},
        { question: "You’re playing a game where you roll two four sided dice and you have a gut feeling that at least one of the dice faces will be even. What is the probability both die added up is 5? (Please put your answer as a simplified fraction)", answer:"1/3"},
        { question: "You’re playing a game where a card is randomly drawn from a special deck of playing cards. You try to guess the suit and the number, and if either one is correct you win. What are the odds that you win? This deck of playing cards has 54 cards, 18 cards of each suit, and 3 of each number and face. (Please put your answer as a simplified fraction)", answer:"10/27"},
        { question: "One of the roulette wheels has 42 slots, 20 reds, 20 blacks, and 2 greens. Each of the red and black roulette wheels are numbered alternatingly with numbers from 1 to 40, with red being odds and black being evens. The greens are both 0. If we know we are going to roll a number less than or equal to 10, what is the probability we land on red? ", answer:"5/12"},

        { question:  "Our researchers have been gathering some data about the wait times at the casino floor bar. It seems that average wait time is 10 minutes, with a standard deviation of 2 minutes. What are the odds that someone’s wait time is between 8 and 12 minutes?", answer:"17/25"},
        { question:  "Someone’s been caught cheating here at the House of odds! They were using a weighted coin with a 0.7 probability of landing on heads. If they flipped a coin 4 times before getting caught and landed on heads 3 times, what is the probability of that?", answer:"1029/2500"},
        { question:  "At this slot machine, you either win a cash prize or lose. If the probability of winning a game is 50% and you spin 100 times, what is the mean and standard deviation? Approximating with a normal distribution, what are the odds you win more than 55 times?", answer:"4/25"}
      ],
      skipDuplicates: true,
    })
  };
}
