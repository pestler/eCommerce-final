import React from 'react';
import Developer from '../../components/developer/developer';
import styles from './about.module.scss';

const About: React.FC = () => {
  return (
    <div className={styles.containerAbout}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>
          О нас
          <a
            href="https://rs.school/"
            target="_blank"
            className={styles.aboutRsButton}
          ></a>
        </h1>
        <p className={styles.description}>
          Наша команда - состоит из трех разработчиков. Мы собралась для чего-то
          нового в мире информационных технологий. Успех этого проекта -
          результат слаженной командной работы и взаимной поддержки. Светлана
          предложила сделать магазин по продажам цветов, Иван предоставил
          готовый проект по этой тематике, который он сделал в Figma раньше,
          Олег занялся новыми разработками. Приступили к работе, образовалась
          команда! Был создан канал в дискорде, со множеством разделов,
          планировались заранее встречи с участием менторов, создали доску
          Trello, распределили задачи.
        </p>
      </div>
      <div className={styles.developer__container}>
        <Developer></Developer>
      </div>
      <div className={styles.aboutRegardsContainer}>
        <div className={styles.containerEffect}>
          <a
            href="https://rollingscopes.com/"
            target="_blank"
            className={styles.aboutRsButtonH2}
          >
            <h2 className={styles.aboutRegards}>
              Большое спасибо школе RS School
            </h2>
          </a>
          <a
            href="https://rs.school/"
            target="_blank"
            className={styles.aboutRsButton}
          ></a>
        </div>
      </div>
    </div>
  );
};

export default About;
