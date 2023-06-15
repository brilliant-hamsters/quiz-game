import { FunctionComponent } from 'react'
import style from './forumThemesList.module.scss'
import { Theme } from '../../../typings/appTypes'
interface IForumThemesListProps {
  theme: Theme
  active: boolean
  onClick: (id: number) => void
}

export const ForumThemesList: FunctionComponent<IForumThemesListProps> = ({
  theme,
  active,
  onClick,
}) => {
  function changeActiveTheme() {
    if (theme.id) onClick(theme.id)
  }
  return (
    <li className={style.root} onClick={changeActiveTheme}>
      <div className={`${active ? style.active : ''} ${style.wrap}`}>
        {theme.theme}
      </div>
    </li>
  )
}
