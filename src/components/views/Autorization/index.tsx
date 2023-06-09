import styles from './style.module.scss';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import IServerUser from '../../../models/responses/IServerUserResponse';
import AccountAPI from '../../../api/AccountAPI';
import axiosConfig from '../../../api/axiosConfig';
import IVisitor from '../../../models/requests/IVisitorRequest';
import Password from '../../ui/Password';
import MistakeModal from '../../modals/MistakeModal';
import InternetModal from '../../modals/InternetModal';
import CustomInput from '../../ui/CustomInput';
import ISignInResponse from '../../../models/responses/ISignInResponse';

const Autorization = (props: any) => {
    const [userLogin, setUserLogin] = useState<string>('');
    const [userPassword, setUserPassword] = useState<string>('');
    const [mistakesArr, setMistakesArr] = useState<string[]>([]);
    const navigate = useNavigate();
    const [isOpenMistakes, setIsOpenMistakes] = useState<boolean>(false);
    const [isInternet, setIsInternet] = useState<boolean>(false);

    const handleLoginChange = (phrase: string) => {
        setUserLogin(phrase);
        setIsOpenMistakes(false);
    };
    const getPasswordValue = (phrase: string) => {
        setUserPassword(phrase);
        setIsOpenMistakes(false);
    };

    const handleComeClick = (e: any) => {
        e.preventDefault();
        const user: IVisitor = {
            login: userLogin,
            password: userPassword
        } 

        if (userLogin && userPassword 
            && isInternet && !isOpenMistakes 
        ) {
            sendReq(user);   
        } else {
            console.log('😈');
        }
    }

    const cleanLocaleStorage = () => {
        localStorage.removeItem('name');
        localStorage.removeItem('email');
        localStorage.removeItem('birthDate');
        localStorage.removeItem('gender');
        localStorage.removeItem('career');
        localStorage.removeItem('post');
    }

    const fillLocalStorage = (person: IServerUser) => {
        cleanLocaleStorage();
        localStorage.setItem('name', String(person.name));
        localStorage.setItem('email', String(person.email));
        localStorage.setItem('birthDate', String(person.birthDate));
        localStorage.setItem('gender', String(person.gender));
        localStorage.setItem('career', String(person.career));
        localStorage.setItem('post', String(person.post));
    }

    const sendReq = (user: IServerUser) => {
        AccountAPI.autorization(user)
            .then(response => {
                if (response.status <= 204) {
                    const data = (response.data as ISignInResponse);
                    const user = data.user;
                    fillLocalStorage(user);
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('password', userPassword);
                    localStorage.setItem('login', userLogin);
                    axiosConfig.defaults.headers.common['Authorization']  = `Bearer ${data.token}`;
                    navigate('main/welcoming');
                    setIsOpenMistakes(false);
                }
            })
            .catch(error => {
                console.log(error.response.data.message);
                const copyMistakesArr = Object.assign([], mistakesArr);
                copyMistakesArr.push(error.response.data.message);
                setMistakesArr(copyMistakesArr);
                setIsOpenMistakes(true);
            });
    }

    const getInernet = (value: boolean) => {
        setIsInternet(value);
    }

    const checkToken = () => {
        // if (localStorage.getItem('token')) {
        //     navigate('main/welcoming');
        // }
    }

    useEffect(() => {
        checkToken();
    }, []);

    return (
        <div className={styles.autorization}>
            <InternetModal getInternet={getInernet}/>
            {isOpenMistakes ? <MistakeModal phraseArr = {mistakesArr}/> : null}
            <form>
                <h2>Авторизация</h2>
                <CustomInput 
                    setValue={handleLoginChange} 
                    placeholderValue='Логин/Email' 
                    labelValue='Логин/Email' 
                    type="text" 
                    defaultValue={userLogin}
                />

                <Password getPasswordValue={getPasswordValue} defaultVal={userPassword}/>
                <div className={styles.btns}>
                    <button onClick={(e: any) => handleComeClick(e)}>
                        Войти
                    </button>
                    <button className={styles['password-new-btn']}>
                        Сброс пароля
                    </button>
                </div>
                <button 
                    className={styles.registration}
                    onClick={() => navigate('registration')}
                >
                    Зарегистрироваться
                </button>
            </form>
        </div>
    )
}   

export default Autorization;
