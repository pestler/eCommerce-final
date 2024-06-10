import Developer from '../../components/developer/developer';
import styles from './about.module.scss';
import develops from './../../assets/develops';
  
console.log(develops);

//const aboutTitle = 


const About: React.FC = () => {
  return (
    <div className="containerAbout">
      <div className={styles.wrapper}>
        <h2>О нашей команде!</h2>
        <p className={styles.description}>
          
        </p>
        <div className={styles.aboutRegards}>
          <p className={styles.aboutRegards}>Большое спасибо</p>
          <a
            href="https://rs.school/"
            target="_blank"
            className={styles.aboutRsButton}
          ></a>
        </div>
      </div>
    <Developer></Developer>
    <Developer></Developer>
    <Developer></Developer>

    </div>
  );
};

export default About;
