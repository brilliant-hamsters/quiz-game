import styles from './GamePage.module.scss'
import { Answer } from '../../components/block/Answer'
import { BtnRoute } from '../../components/block/ButtonRout'
import iconHome from '../../../public/images/icons/icon_home.svg'
import iconLeaderboarStar from '../../../public/images/icons/icon_leaderboard_star.svg'
import iconPercon from '../../../public/images/icons/icon_user_circle.svg'
import { QuestionType, QuizGame } from '../../engine/QuizGame'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const game = new QuizGame()

export const GamePage = () => {
  const navigate = useNavigate()
  const [currentQuestion, onChangeCurrentQuestion] = useState<QuestionType>()

  useEffect(() => {
    onChangeCurrentQuestion(game.startGame())
  }, [])

  function onClick(answer: string) {
    const result = game.checkAnswerAndMoveNext(answer)
    if (typeof result === 'object') onChangeCurrentQuestion({ ...result })
    if (typeof result === 'number') navigate('/end')
  }

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div className={styles.title}>Time-left:</div>
        <div className={styles.timer}></div>
        <div className={styles.money}>{game.totalCash}</div>
      </div>
      <div className={styles.game}>
        <div className={styles.questionControl}>
          <div className={styles.question}>
            <span>{currentQuestion?.question}</span>
          </div>
        </div>
        <ul className={styles.answersList}>
          {currentQuestion?.answers.map((answer: string, i: number) => {
            return (
              <li
                key={i}
                className={styles.answer}
                onClick={() => {
                  onClick(answer)
                }}>
                <Answer answer_number={i + 1} answer_text={answer} />
              </li>
            )
          })}
        </ul>
      </div>
      <nav className={styles.navBar}>
        <ul className={styles.linkList}>
          <li className={styles.link}>
            <BtnRoute
              image_path={iconHome}
              name_btn="Go start"
              link={'/home'}
            />
          </li>
          <li className={styles.link}>
            <BtnRoute
              image_path={iconLeaderboarStar}
              name_btn="Leaders"
              link={'/leaderbord'}
            />
          </li>
          <li className={styles.link}>
            <BtnRoute
              image_path={iconPercon}
              name_btn="Profile"
              link={'/profile'}
            />
          </li>
        </ul>
      </nav>
    </div>
  )
}
