import { FunctionComponent } from 'react'
import style from './formThemesMessages.module.scss'

interface IFormThemesMessagesProps {
  message: string
  your: boolean
  nickName: string
}

export const FormThemesMessages: FunctionComponent<
  IFormThemesMessagesProps
> = ({ message, your, nickName }) => {
  return (
    <div className={`${style.root} ${your ? style.your : style.other}`}>
      <div className={style.message}>
        <span className={style.nickName}>{nickName}</span>
        {message}
      </div>
    </div>
  )
}
