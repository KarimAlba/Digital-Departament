import styles from './style.module.scss';
import KorolevImg from '../../../assets/images/korolev.png';

const Welcoming = () => {
    return (
        <div className={styles['welcome-page']}>
            <div className={styles.text}>
                <h1>Главная</h1>
                <p>Приветствуем Вас на информационном портале <span className={styles.title}>Digital Departament</span></p>
                <p>Мы постарались сделать все возможное для того, чтобы поиск и обмен информацией в области инженерии, в частности ракетостроения, стали немного проще.</p>
                <p>Кроме доступа к большому количеству литературы, Вы получаете возможность помочь остальным, размещая свои публикации, обсуждая тот или иной материал посредством комментариев.</p>
                <p>Спасибо за использование нашего портала, желаем Вам успехов в изучении вашей тематики!</p>
            </div>
            <img src={KorolevImg} alt="korolev" />
        </div>
    )
}

export default Welcoming;
