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
                        <div className='switcher'>
                            <span className='switcher_sex'>M</span>
                            <label className='switch'>
                                <input type="checkbox"/>
                                <span className="slider round"></span>
                            </label>
                            <span className='switcher_sex'>Ж</span>
                        </div>
                        <input type="text" placeholder="Род деятельности"/>
                        <input type="text" placeholder="Должность"/>
                        <button className={styles['reg-btn']}>
                            <Link to='/'>
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