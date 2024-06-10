import Developer from '../../components/developer/developer';
import {AboutUs} from './../../assets/develops';
import styles from './about.module.scss';



const aboutTitle = AboutUs.map(about=>{
  return (
    <p key={about.id} className={styles.description}>{about.title}</p>
  )
}
  
)

const About: React.FC = () => {
  return (
    <div className={styles.containerAbout}>
      <div className={styles.wrapper}>
        <h2>О нашей команде!</h2>
    {aboutTitle}
        <div className={styles.aboutRegardsContainer}>
          <p className={styles.aboutRegards}>Большое спасибо</p>
          <a
            href="https://rs.school/"
            target="_blank"
            className={styles.aboutRsButton}
          ></a>
        </div>
      </div>
      <div className={styles.developer__container}>
      <Developer></Developer>      
      </div>
    </div>
  );
};

export default About;
