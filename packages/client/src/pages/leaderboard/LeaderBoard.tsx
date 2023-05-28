import style from './leaderBoiard.module.scss'
import trophy from '../../../public/images/icons/trophy.svg'
import emoji from '../../../public/images/icons/emoji.svg'
import arrow from '../../../public/images/icons/icon_back.svg'
import { FunctionComponent, useEffect, useState } from 'react'
import { LeaderBoardItem } from '../../components/block/leaderBoardItem'
import { LeaderBoardPedestal } from '../../components/block/leaderBoardPedestal'
import { useAppDispatch, useAppSelector } from '../../store'
import { getLeaderboardData } from '../../store/leaderboard/leaderboardSlice'
import { Link } from 'react-router-dom'

export const LeaderBoard: FunctionComponent = () => {
  const [position, setPosition] = useState<number | null>(null)
  const [result, setResult] = useState<number | null>(null)
  const { user } = useAppSelector(state => state.profile)
  const { leaderboard } = useAppSelector(state => state.leaderboard)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(
      getLeaderboardData({
        cursor: 0,
        limit: 100,
      })
    )
  }, [])

  useEffect(() => {
    const leaderboardIndex = leaderboard.findIndex(item => {
      return item.data.id === user?.id
    })

    if (leaderboardIndex !== -1) {
      setPosition(leaderboardIndex + 1)
      setResult(leaderboard[leaderboardIndex].data.result)
    }
  }, [leaderboard])

  return (
    <section className={style.root}>
      <div className={style.blocks}>
        <div className={style['block-left']}>
          <div>
            <div className={style['block-left-trophy']}>
              <div className={style.trophyIcon}>
                <img src={trophy} alt="trophy" />
              </div>
              <div className={style.titles}>
                <h2 className={style.title}>
                  Место в рейтинге: {position ?? '-'}
                </h2>
              </div>
            </div>
            <div className={style['block-left-salary']}>
              <h3 className={style.titleSalary}>
                Твой результат: {result ? result + '₽' : '-'}
              </h3>
              <div className={style.emojiWrapper}>
                <div className={style.emojiIcon}>
                  <img src={emoji} alt="emoji" />
                </div>
                <div className={style['block-left-text']}>
                  {position !== null &&
                    position === 1 &&
                    'Выше быть не может, ты и так потолок пробил!'}
                  {position !== null &&
                    position > 1 &&
                    position < 9 &&
                    'Поздравляю, ты в топе! Докажи всем, что ты лучший!'}
                  {position !== null &&
                    position > 8 &&
                    'Отличный результат! Но ещё есть куда стремиться!'}
                </div>
              </div>
            </div>
          </div>
          <LeaderBoardPedestal />
        </div>
        <div className={style['block-rigth']}>
          <h2 className={style.leadersTitle}>Рейтинг игроков</h2>
          <ul className={style.leaders}>
            {leaderboard.length
              ? leaderboard.slice(0, 8).map(item => {
                  return (
                    <LeaderBoardItem
                      key={item.data.id}
                      nickname={item.data.login}
                      money={item.data.result}
                    />
                  )
                })
              : 'Лидеров нет!'}
          </ul>
        </div>
      </div>
      <div className={style.sidebar}>
        <div className={style.sidebarArrow}>
          <Link to="/start">
            <img src={arrow} alt="arrow" />
          </Link>
        </div>
        <div className={style.sidebarDivider}></div>
      </div>
    </section>
  )
}
