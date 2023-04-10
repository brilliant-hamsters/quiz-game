import * as question from './questions.json';

export class QuizGame {
  config: Record<string, number | string | string[] | boolean>[] | null;
  saveCash: unknown;
  totalCash: unknown;
  numberQuestion: number;

  constructor() {
    this.config = null;
    this.saveCash = 0;
    this.totalCash = 0;
    this.numberQuestion = 0
  }

  private configStarted() {
    const result: Record<string, number | string | string[] | boolean>[] = [];
    let award = 0;

    question.forEach(({ questions }) => {
      let iterationCount = 0;
      const historyQuestion: number[] = [];

      while(iterationCount < 2) {
        const randomQuestion = Math.floor(Math.random() * (5));

        if (!historyQuestion.length || (!historyQuestion.includes(randomQuestion) && historyQuestion.length)) {
          iterationCount += 1;
          award = (award * 2) + 500;

          historyQuestion.push(randomQuestion);

          if (iterationCount !== 4) {
            result.push({ ...questions[randomQuestion], save: false, award: award })
          } else {
            result.push({ ...questions[randomQuestion], save: true, award: award })
          }
        }
      }
    });

    return result;
  }

  private selectQuestion(id: number) {
    if (!this.config) {
      return;
    }

    return this.config[id];
  }

  public checkingAnswer(answer: string) {
    if (!this.config) {
      return;
    }

    const { correctAnswer, save, award } = this.config[this.numberQuestion];

    if (correctAnswer === answer) {
      this.numberQuestion += 1;
      this.saveCash = save ? award : this.saveCash;
      this.totalCash = award;

      if (this.numberQuestion === this.config.length) {
        return this.endGame(true);
      } else {
        return this.selectQuestion(this.numberQuestion);
      }
    } else {
      this.totalCash = 0;
      return this.endGame(false);
    }
  }

  public startGame() {
    this.config = this.configStarted();
    return this.selectQuestion(this.numberQuestion);
  }

  private endGame(victory: boolean) {
    if (victory) {
      return this.totalCash
    } else {
      return this.saveCash ? this.saveCash : this.totalCash;
    }
  }
}
