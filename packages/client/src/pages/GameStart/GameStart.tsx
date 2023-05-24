import { Link } from 'react-router-dom'
import { GameLayout } from '../../layouts/GameLayout'
import styles from './GameStart.module.scss'
import logoutIcon from '/images/icons/logout-icon.svg'
import { useEffect } from 'react'

export function GameStart(): JSX.Element {
  return (
    <GameLayout>
      <>
        <div className={styles.logoutContainer}>
          <Link to="/auth">
            <img className={styles.logoutImage} src={logoutIcon} alt="Выход" />
          </Link>
        </div>
        <div>
          <Link className={styles.leadLink} to="/">
            <h1 className={styles.lead}>Начать игру</h1>
          </Link>
          <p className={styles.leadText}>Узнай свой уровень</p>
        </div>
      </>
    </GameLayout>
  )
}
