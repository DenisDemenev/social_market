import React from 'react';
import styles from './GroupHeader.module.css';

const GroupHeader = () => {
  return (
    <div className={styles.header__container}>
      <p className={styles.header__name}>Название</p>
      <p></p>
      <p>Статистика</p>
      <p>Цена</p>
      <p>CPM</p>
      <p>Категория</p>
      <p>Топ / Лента</p>
    </div>
  );
};

export default GroupHeader;
