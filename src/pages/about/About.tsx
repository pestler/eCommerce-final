import Developer from '../../components/developer/developer';
import { AboutUs } from '../../contstants/develops';
import styles from './about.module.scss';
import React from "react";

const aboutTitle = AboutUs.map((about) => {
  return (
    <p key={about.id} className={styles.description}>
      {about.title}
    </p>
  );
});

const About: React.FC = () => {
  return (
    <div className={styles.containerAbout}>
      <div className={styles.wrapper}>
        <h1>О нашей команде!</h1>
        {aboutTitle}
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
      <div className={styles.developer__container}>
        <Developer></Developer>
      </div>
    </div>
  );
};

export default About;
