import style from './leaderBoiard.module.scss'
import trophy from '../../../public/images/icons/trophy.svg'
import emoji from '../../../public/images/icons/emoji.svg'
import arrow from '../../../public/images/icons/arrow.svg'
import { FunctionComponent, useState } from 'react'
import { LeaderBoardItem } from '../../components/block/leaderBoardItem'
import { ILeaderBoardItemProps } from '../../components/block/leaderBoardItem/LeaderBoardItem'
import { LeaderBoardPedestal } from '../../components/block/leaderBoardPedestal'

const arrList: ILeaderBoardItemProps[] = [
  {
    nickname: 'anonim',
    money: 10000,
  },
  {
    nickname: 'anonim2',
    money: 1000,
  },
  {
    nickname: 'anonim3',
    money: 30000,
  },
]

export const LeaderBoard: FunctionComponent = () => {
  const [leaderItem, setLeaderItem] = useState(arrList ?? [])
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
                <h2 className={style.title}>You position: 1</h2>
                <h3 className={style.subTitle}>Ты победитель высшей лиги</h3>
              </div>
            </div>
            <div className={style['block-left-salary']}>
              <h3 className={style.titleSalary}>Твоя зарплата: 1000000₽</h3>
              <div className={style.emojiWrapper}>
                <div className={style.emojiIcon}>
                  <img src={emoji} alt="emoji" />
                </div>
                <div className={style['block-left-text']}>
                  Выше быть не может, ты и так потолок пробил
                </div>
              </div>
            </div>
          </div>
          <LeaderBoardPedestal />
        </div>
        <div className={style['block-rigth']}>
          <h2 className={style.leadersTitle}>Leaderboard</h2>
          <ul className={style.leaders}>
            {leaderItem.length
              ? leaderItem.map(item => {
                  return (
                    <LeaderBoardItem
                      key={item.nickname}
                      nickname={item.nickname}
                      money={item.money}
                    />
                  )
                })
              : 'Лидеров нет!'}
          </ul>
        </div>
      </div>
      <div className={style.sidebar}>
        <div className={style.sidebarArrow}>
          <img src={arrow} alt="arrow" />
        </div>
        <div className={style.sidebarDivider}></div>
      </div>
    </section>
  )
}
