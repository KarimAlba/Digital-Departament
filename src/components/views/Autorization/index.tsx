import styles from './style.module.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import IServerUser from '../../../models/IServerUser';
import AccountAPI from '../../../api/AccountAPI';
import axiosConfig from '../../../api/axiosConfig';
import IVisitor from '../../../models/IVisitor';
import Password from '../Password';

const Autorization = (props: any) => {
    const [userLogin, setUserLogin] = useState<string>('');
    const [userPassword, setUserPassword] = useState<string>('');
    const [correctData, setCorrectData] = useState<boolean>(true);

    const handleLoginChange = (e: any) => {setUserLogin(e.target.value)};
    const getPasswordValue = (phrase: string) => {setUserPassword(phrase)};

    const handleComeClick = () => {
        const user: IVisitor = {
            login: userLogin,
            password: userPassword
        } 
        sendReq(user);
    }

    const sendReq = (user: IServerUser) => {
        AccountAPI.autorization(user)
            .then(response => {
                if (response.status <= 204) {
                    const user = response.data.user;
                    for (let key in user) {
                        localStorage.setItem(`${key}`, user.key);
                    }
                    setCorrectData(true);
                    console.log(response);
                    localStorage.setItem('token', response.data.token);
                    axiosConfig.defaults.headers.common['Authorization']  = `Bearer ${response.data.token}`;
                } else {
                    setCorrectData(false);
                }
            })
            .catch(error => console.log(error));
    }

    return (
        <div className={styles.autorization}>
            {!correctData
                ? (<div className={styles.message}>
                    <h3>Проверьте правильность введенных данных</h3>
                </div>)
                :  null
            }
            <form action="">
                <h2>Авторизация</h2>
                <input 
                    type="text" placeholder="Логин/Email"
                    className={styles.login}
                    onInput={handleLoginChange}
                />
                <Password getPasswordValue={getPasswordValue}/>
                <div className={styles.btns}>
                    <button onClick={handleComeClick}>
                        <Link to={'/main/personalbooks'}>
                            Войти
                        </Link>
                    </button>
                    <button className={styles['password-new-btn']}>
                        Сброс пароля
                    </button>
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

export default Autorization;
