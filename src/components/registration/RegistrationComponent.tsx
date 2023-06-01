import styles from './RegistrationComponent.module.scss';
import { Link } from 'react-router-dom';

const Registration = (props: any) => {
    return(
        <div className='background'>
            <div className={styles.registration}>
                <h2>Регистрация</h2>
                <div className={styles['columns-container']}>
                    <div className={styles.column}>
                        <input type="text" placeholder="Имя"/>
                        <input type="text" placeholder="Логин"/>
                        <input type="text" placeholder="Email"/>
                        <label htmlFor="password">Пароль</label>
                        <input 
                            type="password" className={styles.password}
                            name="password" placeholder='Введите пароль'
                        />
                        <input type="password" placeholder="Повторите пароль"/>
                    </div>

                    <div className={styles.column}>
                        <input type="text" placeholder="Дата рождения"/>
                        <input type="сheckbox"/>
                        <input type="text" placeholder="Род деятельности"/>
                        <input type="text" placeholder="Должность"/>
                        <button className={styles['reg-btn']}>
                            <Link to='/autorisation'>
                                Зарегистрироваться
                            </Link>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Registration