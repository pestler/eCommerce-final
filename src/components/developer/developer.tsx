import React from 'react';
import { AboutUs } from '../../contstants/aboutUs.constants.ts';
import Github from './../../assets/images/github1.png';
import styles from './developer.module.scss';

const Developer: React.FC = () => {
  return AboutUs.map((develop) => {
    return (
      <div key={develop.id} className={styles.about__us}>
        <div className={styles.aboutus__picture}>
          <img
            className={styles.aboutus__photo}
            src={develop.img}
            alt="фото участников"
          />
          <div className={styles.aboutus__github}>
            <a
              href={develop.github}
              className={styles.github__link}
              target="blank"
            >
              <img src={Github} alt="github" className={styles.github__logo} />
            </a>
          </div>
        </div>
        <div className={styles.about__develop}>
          <p>{develop.name}</p>
          <p>{develop.city}</p>
          <p>{develop.role}</p>
          <p>{develop.about}</p>
        </div>
        <div className={styles.description__develop}>
          <p>{develop.сontributions}</p>
        </div>
      </div>
    );
  });
};

export default Developer;
