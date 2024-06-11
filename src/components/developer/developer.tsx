import React from 'react';
import { Develops } from './../../assets/develops';
import styles from './developer.module.scss';
import Github from './../../assets/images/github.png'


const Developer: React.FC = () => {
  return Develops.map((develop) => {
    return (
      <div className={styles.aboutus}>
        <div className={styles.aboutus__picture}>
          <img key={develop.id}
            className={styles.aboutus__photo} 
            src={develop.img}
            alt="фото участников"
          />
            <div className={styles.aboutus__github}>
          <a key={develop.id} href={develop.github} className={styles.github__link} target='blank'>
            <img src={Github} alt="github" className={styles.github__logo}/>
          </a>
        </div>
        </div>
        <div className={styles.description__name}>
          <p key={develop.id}> {develop.name}</p>
        </div>      
        <div className={styles.description__text}>
          <span key={develop.id}> {develop.about}</span>
        </div>
      </div>
    );
  });
};

export default Developer;
