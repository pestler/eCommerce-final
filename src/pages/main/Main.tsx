import React, { useEffect } from 'react';
import styles from './main.module.scss';

const Main: React.FC = () => {
  useEffect(() => {


  });

  const registrationHandler = async () => {

  }

  return (
    <div className={styles.main}>
      <h2>Main</h2>
      <button onClick={registrationHandler}>Войти</button>
    </div>
  );
};

export default Main;
