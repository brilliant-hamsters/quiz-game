import { FunctionComponent } from 'react'
import style from './formThemesMessages.module.scss'

interface IFormThemesMessagesProps {
  message: string
  nickName: string
}

export const FormThemesMessages: FunctionComponent<
  IFormThemesMessagesProps
> = ({ message, nickName }) => {
  return (
    <div className={style.root}>
      <div className={style.message}>
        <span className={style.nickName}>{nickName}</span>
        {message}
      </div>
    </div>
  )
}
