import styles from './GamePage.module.scss'
import { TimeBar } from '../../components/block/TimeBar'
import { Answer } from '../../components/block/Answer'
import { BtnRoute } from '../../components/block/ButtonRout'
import iconHome from '../../../public/images/icons/icon_home.svg'
import iconLeaderboarStar from '../../../public/images/icons/icon_leaderboard_star.svg'
import iconPercon from '../../../public/images/icons/icon_user_circle.svg'
import { QuestionType, QuizGame } from '../../engine/QuizGame'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChoiceTheme } from '../../utils/hoc/ChooseTheme'
import { useAppDispatch, useAppSelector } from '../../store'
import { updateLeaderboardData } from '../../store/leaderboard/leaderboardSlice'

export const game = new QuizGame()

export const GamePage = () => {
  const [currentQuestion, onChangeCurrentQuestion] = useState<QuestionType>()
  const { loggedIn } = useAppSelector(state => state.auth)
  const { user } = useAppSelector(state => state.profile);
  const navigate = useNavigate();
  const dispatch = useAppDispatch()

  useEffect(() => {
    onChangeCurrentQuestion(game.startGame())
    if (!loggedIn) {
      navigate('/auth');
    }
  }, []);


  function saveResult() {
    if (user) {
      dispatch(updateLeaderboardData({
        result: game.savedCash,
        id: user.id,
        login: user.login,
      }))
    }
  }

  function onClick(answer: string) {
    const result = game.checkAnswerAndMoveNext(answer)
    if (typeof result === 'object') onChangeCurrentQuestion({ ...result })
    if (typeof result === 'number') {
      saveResult()
      navigate('/end')
    }
  }

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div className={styles.title}>Time-left:</div>
        <div className={styles.timer}>
          <TimeBar />
        </div>
        <div className={styles.money}>{game.totalCash}</div>
      </div>
      <div className={styles.game}>
        <ChoiceTheme/>
        <div className={styles.questionControl}>
          <div className={styles.question}>
            <span>{currentQuestion?.question}</span>
          </div>
        </div>
        <ul className={styles.answersList}>
          {currentQuestion?.answers.map((answer: string, i: number) => (
            <li
              key={i}
              className={styles.answer}
              onClick={() => {
                onClick(answer)
              }}>
              <Answer answer_number={i + 1} answer_text={answer} />
            </li>
          ))}
        </ul>
      </div>
      <nav className={styles.navBar}>
        <ul className={styles.linkList}>
          <li className={styles.link}>
            <BtnRoute
              image_path={iconHome}
              name_btn="Go start"
              link={'/start'}
            />
          </li>
          <li className={styles.link}>
            <BtnRoute
              image_path={iconLeaderboarStar}
              name_btn="Leaders"
              link={'/leaderboard'}
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
