import { useState } from 'react'
import { Link } from 'react-router-dom'
import { GameLayout } from '../../layouts/GameLayout'
import styles from './GameEnd.module.scss'
import logoutIcon from '/images/icons/logout-icon.svg'

export function GameEnd(): JSX.Element {
  const [state] = useState(10)

  return (
    <GameLayout>
      <>
        <div className={styles.container}>
          <div>
            <h1 className={styles.title}>Конец игры</h1>
            <p className={styles.result}>Твоё место в рейтинге: {state}</p>
          </div>
          <Link to="/auth">
            <img className={styles.logoutImage} src={logoutIcon} alt="Выход" />
          </Link>
        </div>
        <Link className={styles.leadLink} to="/start">
          <h2 className={styles.lead}>В начало</h2>
        </Link>
      </>
    </GameLayout>
  )
}
