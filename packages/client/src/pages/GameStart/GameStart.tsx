import { Link, useNavigate } from 'react-router-dom'
import { GameLayout } from '../../layouts/GameLayout'
import styles from './GameStart.module.scss'
import logoutIcon from '/images/icons/logout-icon.svg'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store'
import { sigInYandex } from '../../store/auth/authSlice'

export function GameStart(): JSX.Element {
  const [isMounted, setIsMounted] = useState(true)
  const { verificate } = useAppSelector(state => state.auth)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  
  useEffect(() => {
    if(verificate && !isMounted) {
      dispatch(sigInYandex({ 
          code: String(new URL(window.location.href).searchParams.get('code')), 
          redirect_uri: 'https://quiz-game-client.vercel.app/start'
      }))
      .then((response) => {
                if(response.payload === 'Произошла ошибка') navigate('/auth')
              }
            )
    }
    setIsMounted(false)
  }, [isMounted])
  
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
