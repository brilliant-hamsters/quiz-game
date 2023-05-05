import { LayoutMenu } from './LayoutMenu'
import styles from './GameLayout.module.scss'

interface IGameLayout {
  children: JSX.Element
}

export function GameLayout({ children }: IGameLayout): JSX.Element {
  return (
    <div className={styles.layoutContainer}>
      <div className={styles.layout}>
        {children}
        <LayoutMenu />
      </div>
    </div>
  )
}
