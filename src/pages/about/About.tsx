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
              Команда, состоящая из трех разработчиков, собралась для длительного
          путешествия в мир информационных технологий. Успех в этом проекте стал
          результатом слаженной командной работы и взаимной поддержки. Светлана
          предложила сделать магазин по продажам цветов, а у Ивана случайно
          оказался красивый готовый проект по этой тематике, который он сделал в
          Figma раньше, а Олегу просто понравился этот проект, и мы приступили к
          разработке. Так у нас образовалась команда! Создали канал в дискорде,
          с множеством разделов, планировали заранее встречи с участием
          менторов, создали доску Trello, распределили задачи. Обсуждение
          рабочих вопросов, материал для разработки, кросс-чек, все это в
          тематических каналах нашего сервера в дискорде. Все были немного
          знакомы с реактом, поэтому выбор был очевиден. В качестве сборщика
          проекта решили попробовать Vite.
        </p>
        <div className={styles.aboutRegardsContainer}>
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
