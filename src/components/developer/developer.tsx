import React from 'react';
import { Develops } from './../../assets/develops';
import styles from './developer.module.scss';

const Developer: React.FC = () => {
  return Develops.map((develop) => {
    return (
      <div className={styles.aboutus}>
        <div className={styles.aboutus__picture}>
          <img
            className={styles.aboutus__photo}
            src={develop.img}
            alt="фото участников"
          />
        </div>
        <div className={styles.description__name}>
          <p> {develop.name}</p>
        </div>
        <div className={styles.description__text}>
          <p> {develop.about}</p>
        </div>
        <div className={styles.aboutus__github}>            
          <a href={develop.github}>github</a>
        </div>
      </div>
    );
  });
};

export default Developer;
