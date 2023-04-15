import { question } from './questions'

export type QuestionType = {
  question: string
  answers: string[]
  correctAnswer: string
  save: boolean
  award: number
}

type FinalScoreType = number

export class QuizGame {
  config: QuestionType[] | null
  savedCash: number
  totalCash: number
  currentQuestionNumber: number

  constructor() {
    this.config = null
    this.savedCash = 0
    this.totalCash = 0
    this.currentQuestionNumber = 0
  }

  private buildConfig(): QuestionType[] {
    const result: QuestionType[] = []
    let award = 0

    question.forEach(({ questions }) => {
      let iterationCount = 0
      const historyQuestion: number[] = []

      while (iterationCount < 5) {
        const randomQuestion = Math.floor(Math.random() * 5)

        if (
          !historyQuestion.length ||
          (!historyQuestion.includes(randomQuestion) && historyQuestion.length)
        ) {
          iterationCount += 1
          award = award * 2 + 100

          historyQuestion.push(randomQuestion)

          if (iterationCount !== 4) {
            result.push({
              ...questions[randomQuestion],
              save: false,
              award: award,
            })
          } else {
            result.push({
              ...questions[randomQuestion],
              save: true,
              award: award,
            })
          }
        }
      }
    })

    return result
  }

  private findQuestion(id: number) {
    if (!this.config) {
      return
    }

    return this.config[id]
  }

  public checkAnswerAndMoveNext(
    answer: string
  ): FinalScoreType | QuestionType | undefined {
    if (!this.config) {
      return
    }

    const { correctAnswer, save, award } =
      this.config[this.currentQuestionNumber]

    if (correctAnswer === answer) {
      this.currentQuestionNumber += 1
      this.savedCash = save ? award : this.savedCash
      this.totalCash = award

      if (this.currentQuestionNumber === this.config.length) {
        return this.endGame(true)
      } else {
        return this.findQuestion(this.currentQuestionNumber)
      }
    } else {
      this.totalCash = 0
      return this.endGame(false)
    }
  }

  public startGame() {
    this.currentQuestionNumber = 0
    this.savedCash = 0
    this.totalCash = 0
    this.config = this.buildConfig()
    return this.findQuestion(this.currentQuestionNumber)
  }

  private endGame(victory: boolean) {
    if (victory) {
      return this.totalCash
    } else {
      return this.savedCash ? this.savedCash : this.totalCash
    }
  }
}
