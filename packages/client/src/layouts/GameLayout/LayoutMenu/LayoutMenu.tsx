import { Link } from 'react-router-dom'
import styles from './LayoutMenu.module.scss'
import leaderboardIcon from '../../../../public/images/icons/leaderboard-icon.svg'
import profileIcon from '../../../../public/images/icons/profile-icon.svg'
import forumIcon from '../../../../public/images/icons/forum-icon.svg'

export function LayoutMenu(): JSX.Element {
  return (
    <ul className={styles.menu}>
      <li>
        <Link to="/leader_board">
          <img
            className={styles.menuItem}
            src={leaderboardIcon}
            alt="Лидерборд"
          />
        </Link>
      </li>
      <li>
        <Link to="/profile">
          <img className={styles.menuItem} src={profileIcon} alt="Профиль" />
        </Link>
      </li>
      <li>
        <Link to="/forum">
          <img className={styles.menuItem} src={forumIcon} alt="Форум" />
        </Link>
      </li>
    </ul>
  )
}
