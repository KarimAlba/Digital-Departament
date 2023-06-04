import styles from './AutorizationComponent.module.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import IUser from '../../models/IUser';

const Autorization = (props: any) => {
    const [userLogin, setUserLogin] = useState<string>('');
    const [userPassword, setUserPassword] = useState<string>('');
    const [visitor, setVisitor] = useState<IUser | {}>({});

    const handleLoginChange = (e: any) => {setUserLogin(e.target.value)}
    const handlePasswordChange = (e: any) => {setUserPassword(e.target.value)}

    const handleComeClick = () => {
        const user: IUser = {
            login: userLogin,
            password: userPassword
        } 
        
        setVisitor(user);
        console.log(user);
    }

    return (
        <div className={styles.autorization}>
            <form action="">
                <h2>Авторизация</h2>
                <input 
                    type="text" placeholder="Логин/Email"
                    onInput={handleLoginChange}
                />
                <label htmlFor="password">Пароль</label>
                <input 
                    type="password" className={styles.password}
                    name="password" placeholder='Введите пароль'
                    onInput={handlePasswordChange}
                />
                <div className={styles.btns}>
                    <button onClick={handleComeClick}>
                        <Link to='main'>
                            Войти
                        </Link>
                    </button>
                    <a href="" className={styles['get-password']}>Сброс пароля</a>
                </div>
                <button className={styles.registration}>
                    <Link to='registration'>
                        Зарегистрироваться
                    </Link>
                </button>
            </form>
        </div>
    )
}   

export default Autorization