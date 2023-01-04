import styles from './Groups.module.css';
import React, { useState } from 'react';
import { IoIosStats } from 'react-icons/io';
import { FaRegEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { num_word } from '../../utils/numWord';
import { Button, Divider, Tooltip } from '@mui/material';

const Groups = ({ group }) => {
  const [copySuccess, setCopySuccess] = useState('');

  const copyToClipBoard = async (copyMe) => {
    try {
      await navigator.clipboard.writeText(copyMe);
      setCopySuccess('Copied!');
    } catch (err) {
      setCopySuccess('Failed to copy!');
    }
  };

  return (
    <>
      <div className={styles.group__container}>
        <div className={styles.group__info}>
          <img className={styles.group__image} src={group.avatar} />
          <div className={styles.group__name}>
            <h3
              className={`${styles.group__nameText} ${
                group.label ? styles.group__nameText_label : ''
              }`}>
              <Link
                className={
                  group.label ? styles.group__nameText_label : styles.link
                }
                to={`/group/${group.id}`}>
                {group.name}
              </Link>{' '}
            </h3>
            <p className={styles.group__nameSubscribes}>
              {group.subscribes.toLocaleString('ru')}{' '}
              {num_word(group.subscribes)}
            </p>
          </div>
          <Tooltip title="Скопировать ссылку">
            <Button onClick={() => copyToClipBoard(group.link)}>COPY</Button>
          </Tooltip>
        </div>
        <a href={group.stats} target="_blank" rel="noreferrer">
          <IoIosStats className={styles.group__stats} />
        </a>
        <div className={styles.group__price}>
          <h3 className={styles.group__priceText}>{group.price} руб.</h3>
          <Tooltip title="Охват">
            <p className={styles.group__priceCoverage}>
              {group.coverage.toLocaleString('ru')}
              <span>
                <FaRegEye className={styles.group__coverageIcon} />
              </span>
            </p>
          </Tooltip>
        </div>
        <div>
          <Tooltip title="CPM">
            <p className={styles.group__cpmText}>
              {group.cpm.toLocaleString('ru')}
            </p>
          </Tooltip>
        </div>
        <div>
          {group.subject.map((subject) => (
            <span className={styles.group__subjectText} key={subject.id}>
              {subject.name}
            </span>
          ))}
        </div>
        <div>
          <Tooltip title="Топ/Лента">
            <p>1/24</p>
          </Tooltip>
        </div>
      </div>
      <Divider />
    </>
  );
};

export default Groups;
