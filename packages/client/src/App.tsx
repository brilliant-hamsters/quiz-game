import React from 'react';
import styles from './App.module.scss';
import { Profile } from './pages/Profile';
export const App = () => {
  return <div className={styles.app}><Profile avatar={''} first_name={''} second_name={''} mail={''} phone={''} nickName={''}/></div>;
};
