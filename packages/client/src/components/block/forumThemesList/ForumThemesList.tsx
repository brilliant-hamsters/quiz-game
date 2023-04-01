import { FunctionComponent } from 'react'
import style from './forumThemesList.module.scss'
interface IForumThemesListProps {
  theme: string
  active: boolean
}

export const ForumThemesList: FunctionComponent<IForumThemesListProps> = ({
  theme,
  active,
}) => {
  return (
    <li className={style.root}>
      <div className={`${active ? style.active : ''} ${style.wrap}`}>
        {theme}
      </div>
    </li>
  )
}
