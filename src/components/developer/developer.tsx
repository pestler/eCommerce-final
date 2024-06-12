import React from 'react';
import { Develops } from '../../contstants/develops';
import styles from './developer.module.scss';
import Github from './../../assets/images/github1.png'


const Developer: React.FC = () => {
  return Develops.map((develop) => {
    return (
      <div  key={develop.id} className={styles.aboutus}>
        <div className={styles.aboutus__picture}>
          <img 
            className={styles.aboutus__photo} 
            src={develop.img}
            alt="фото участников"
          />
            <div className={styles.aboutus__github}>
          <a  href={develop.github} className={styles.github__link} target='blank'>
            <img src={Github} alt="github" className={styles.github__logo}/>
          </a>
        </div>
        </div>
        <div className={styles.description__name}>
          <p > {develop.name}</p>
        </div>      
        <div className={styles.description__text}>
          <span > {develop.about}</span>
          <span > {develop.сontributions}</span>
        </div>
      </div>
    );
  });
};

export default Developer;
