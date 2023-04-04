import { FunctionComponent, useState } from 'react'
import style from './leaderBoardItem.module.scss'
import profile from '../../../../public/images/icons/profile.svg'

export interface ILeaderBoardItemProps {
  nickname: string
  money: number
}

export const LeaderBoardItem: FunctionComponent<ILeaderBoardItemProps> = ({
  nickname,
  money,
}) => {
  return (
    <li className={style.root}>
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
