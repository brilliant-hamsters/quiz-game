import style from './leaderBoiard.module.scss'

import trophy from '../../../public/images/icons/trophy.svg'
import emoji from '../../../public/images/icons/emoji.svg'
import emojiTop1 from '../../../public/images/icons/emojiTop1.svg'
import emojiTop2 from '../../../public/images/icons/emojiTop2.svg'
import emojiTop3 from '../../../public/images/icons/emojiTop3.svg'
import arrow from '../../../public/images/icons/arrow.svg'
import { FunctionComponent, useState } from 'react'
import { LeaderItem } from './leaderItem'

export interface ILeaderList {
  nickname: string
  money: number
}
interface ILeaderBoardProps {
  position: number
  salary: number
}

const arrList: ILeaderList[] = [
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
export const LeaderBoard: FunctionComponent<ILeaderBoardProps> = ({
  position,
  salary,
}) => {
  const [list, setList] = useState(arrList ?? [])

  const renderList = () => {
    if (!list.length) {
      return 'Лидеров нет!'
    } else {
      return list.map((item: ILeaderList) => {
        return (
          <LeaderItem
            key={item.nickname}
            nickname={item.nickname}
            money={item.money}
          />
        )
      })
    }
  }

  return (
    <section className={style.leaderBoard}>
      <div className={style.blocks}>
        <div className={style['block-left']}>
          <div>
            <div className={style['block-left-trophy']}>
              <div className={style.trophyIcon}>
                <img src={trophy} alt="trophy" />
              </div>
              <div className={style.titles}>
                <h2 className={style.title}>You position: {position}</h2>
                <h3 className={style.subTitle}>Ты победитель высшей лиги</h3>
              </div>
            </div>
            <div className={style['block-left-salary']}>
              <h3 className={style.titleSalary}>Твоя зарплата: {salary}₽</h3>
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
          <div className={style.columnWrapper}>
            <div className={style.columnElem}>
              <div>
                <img src={emojiTop3} alt="emojiTop3" />
              </div>
              <div className={style.columnFirst}></div>
            </div>
            <div className={style.columnElem}>
              <div>
                <img src={emojiTop1} alt="emojiTop1" />
              </div>
              <div className={style.columnSecond}></div>
            </div>
            <div className={style.columnElem}>
              <div>
                <img src={emojiTop2} alt="emojiTop2" />
              </div>
              <div className={style.columnThird}></div>
            </div>
          </div>
        </div>
        <div className={style['block-rigth']}>
          <h2 className={style.leadersTitle}>Leaderboard</h2>
          <ul className={style.leaders}>{renderList()}</ul>
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
