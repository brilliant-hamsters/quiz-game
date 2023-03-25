import { FunctionComponent } from 'react'
import style from './leaderItem.module.scss'
import profile from '../../../../public/images/icons/profile.svg'
import { ILeaderList } from '../LeaderBoard'

export const LeaderItem: FunctionComponent<ILeaderList> = ({
  nickname,
  money,
}) => {
  return (
    <li className={style.leadersList}>
      <div slot={style.leadersAvatar}>
        <img src={profile} alt="profile" />
      </div>
      <div className={style.leadersInfo}>
        <div>{nickname}</div>
        <div>Money: {money}₽</div>
      </div>
    </li>
  )
}
