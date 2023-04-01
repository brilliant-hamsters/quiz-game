import React from 'react';
import styles from './App.module.scss';
import { GamePage } from './pages/GamePage';
export const App = () => {
  return <div className={styles.app}> <GamePage /></div>;
};
