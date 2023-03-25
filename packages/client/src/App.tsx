import React from 'react'
import styles from './App.module.scss'
import { LeaderBoard } from './pages/leaderboard'

export const App = () => {
  return (
    <div>
      <LeaderBoard position={1} salary={5000000} />
    </div>
  )
}
