import styles from './MainComponent.module.scss'
import { Link } from 'react-router-dom';

const Main = (props: any) => {
    return (
        <div className={styles['main-container']}>
            <div className={styles['main-container_head']}>
                <header>
                    <div className={styles.logo}></div>
                    <input type="text" className={styles.search}/>
                    <div className={styles.book}></div>
                    <div className={styles.star}></div>
                    <div className={styles.face}></div>
                </header>
                <nav>
                    <Link to='/'>Вся литература</Link>
                    <Link to='/'>Предметы</Link>
                    <Link to='/'>Тэги</Link>
                    <Link to='/'>Правообладателям</Link>
                </nav>
            </div>
            <div className={styles['user-library']}>

            </div>
        </div>
    )
}

export default Main;