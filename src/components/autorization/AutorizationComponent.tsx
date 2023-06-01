import styles from './AutorizationComponent.module.scss';
import { Link } from 'react-router-dom';

const Autorization = (props: any) => {
    return (
        <div className={styles.autorization}>
            <form action="">
                <h2>Авторизация</h2>
                <input type="text" placeholder="Логин/Email"/>
                <label htmlFor="password">Пароль</label>
                <input 
                    type="password" className={styles.password}
                    name="password" placeholder='Введите пароль'
                />
                <div className={styles.btns}>
                    <button>Войти</button>
                    <a href="">Сброс пароля</a>
                </div>
                <button className={styles.registration}>
                    <Link to='/registration'>
                        Зарегистрироваться
                    </Link>
                </button>
            </form>
        </div>
    )
}   

export default Autorization