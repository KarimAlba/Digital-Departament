import { useEffect, useState } from 'react';
import styles from './style.module.scss'
import { Link } from 'react-router-dom';
import IUser from '../../models/IUser';
import UserProffessionModal from '../modals/UserProffesionModalComponent';
import axios from 'axios';

const Registration = (props: any) => {
    const [gender, setGender] = useState<number>(0);
    const [userName, setUsersName] = useState<string>('');
    const [userLogin, setUsersLogin] = useState<string>('');
    const [userEmail, setUsersEmail] = useState<string>('');
    const [userPassword, setUsersPassword] = useState<string>('');
    const [correctPassword, setCorrectPassword] = useState<boolean>(true);
    const [userBirthDate, setUsersBirthDate] = useState<string>('');
    const [userPost, setUsersPost] = useState<string>(''); 

    const passwordChecking = (e: any) => {
        e.target.value === userPassword?
            setCorrectPassword(true):
            setCorrectPassword(false);
    }
    
    const handleSwitchClick = () => {
        if (gender == 0) {
            setGender(1);
        } else {
            setGender(0);
        }
    }

    const handleNameChange = (e: any) => {setUsersName(e.target.value)}
    const handleLoginChange = (e: any) => {setUsersLogin(e.target.value)}
    const handleEmailChange = (e: any) => {setUsersEmail(e.target.value)}
    const handlePasswordChange = (e: any) => {setUsersPassword(e.target.value)}
    const handleBirthDateChange = (e: any) => {setUsersBirthDate(e.target.value)}

    const handlePostChange = (e: any) => {setUsersPost(e.target.value)}

    const [userCareer, setUsersCareer] = useState<string>('');
    const handleCareerChange = (phrase: string) => {setUsersCareer(phrase)}

    const sendReq = (user: IUser) => {
        let apiUrl = 'http://192.168.97.130:3000/account/sign-up';
        axios.post(apiUrl, {
            login: user.login,
            password: user.password,
            name: user.name,
            gender: user.gender,
            email: user.email,
            birthDate: user.birthDate,
            career: user.career,
            post: user.post
        })
            .then(responce => console.log('responce - ', responce))
            .catch((error) => console.log('error - ', error))
    }

    const [newUser, setNewUser] = useState<IUser | {}>({});
    const handleReqistrationClick = () => {
        const user: IUser = {
            name: userName,
            login: userLogin,
            email: userEmail,
            password: userPassword,
            birthDate: userBirthDate,
            gender: gender,
            career: userCareer,
            post: userPost
        }
        setNewUser(user);
        sendReq(user);
    }

    const [registrationReady, setRegistrationReady] = useState<boolean>(true);
    const checkRegistrationReady = () => {
        if (userName && userLogin && userEmail 
                && userPassword && userBirthDate && correctPassword 
                && userCareer && userPost
            ) {
            setRegistrationReady(true);
        } else {
            setRegistrationReady(false);
        }
    }

    const [isActivePassword, setIsActivePassword] = useState<boolean>(false);
    const [isActiveRepeatPassword, setIsActiveRepeatPassword] = useState<boolean>(false);

    useEffect(() => {
        checkRegistrationReady();
    }, 
    [userPost]);

    return(
        <div className='background'>
            <div className={styles.registration}>
                <h2>Регистрация</h2>
                <div className={styles['columns-container']}>
                    <div className={styles.column}>
                        <input type="text" placeholder="Имя" onInput={handleNameChange}/>
                        <input type="text" placeholder="Логин" onInput={handleLoginChange}/>
                        <input type="text" placeholder="Email" onInput={handleEmailChange}/>
                        <div>
                            {isActivePassword? <label htmlFor="password">Пароль</label>: null}
                            <input 
                                type="password" className={styles.password}
                                name="password" placeholder='Введите пароль'
                                onInput={handlePasswordChange}
                                onClick={() => setIsActivePassword(true)}
                                style={isActivePassword?
                                    {border: 'none', borderBottom: '1px solid #309FFF', borderRadius: 0}: 
                                    {border: '1px solid #C1CAD2', borderRadius: '6px'}
                                }
                            />
                        </div>                                 
                        <div>
                           {isActiveRepeatPassword?  <label htmlFor="repeat-password">Повторите пароль</label>: null}
                            {isActiveRepeatPassword?
                                <input 
                                    type="password" placeholder="Повторите пароль"
                                    onInput={passwordChecking} name='repeat-password'
                                    onClick={() => setIsActiveRepeatPassword(true)}
                                    style={
                                        correctPassword?
                                        {borderRadius:'0px', border: 'none', borderBottom:'1px solid #309FFF'}:
                                        {borderRadius:'0px', border: 'none', borderBottom: '1px solid red'}
                                    }
                                />: 
                                <input 
                                    type="text"  placeholder="Повторите пароль" 
                                    onClick={() => {setIsActiveRepeatPassword(true)}}
                                    onInput={() => {setIsActiveRepeatPassword(true)}}
                                />
                            }
                        </div>  
                    </div>

                    <div className={styles.column}>
                        <input 
                            placeholder='Дата рождения'
                            name='birthday'
                            className={styles['date-input']}
                            type="text"
                            onFocus={(e:any) => e.target.type = 'date'}
                            onBlur={(e:any) => e.target.type = 'text'}
                            onInput={handleBirthDateChange} 
                            min="1946-01-01" max="2020-12-31"
                        />
                        <div className='switcher'>
                            <span 
                                className='switcher_sex' 
                                style={gender == 0?{color: '#0488FD', fontWeight:700}: {color: '#C1CAD2'}}
                            >
                                M
                            </span>
                            <label className='switch'>
                                <input type="checkbox"  onClick={handleSwitchClick}/>
                                <span className="slider round"></span>
                            </label>
                            <span 
                                className='switcher_sex' 
                                style={gender == 0? {color: '#C1CAD2'}: {color: '#FF3C82', fontWeight:700}}
                            >
                                Ж
                            </span>
                        </div>
                        <div style={{position: 'relative'}}>
                            <UserProffessionModal handleCareerChange={handleCareerChange}/>
                        </div>
                        <input 
                            type="text" placeholder="Должность"
                            onInput={handlePostChange}
                        />
                        {
                            !registrationReady? 
                            <div className={styles['registration-back']}></div>
                            :<button 
                                className={styles['reg-btn']}
                                onClick={handleReqistrationClick}
                            >
                                <Link to='/main/personalbooks'>
                                    Зарегистрироваться
                                </Link>   
                            </button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Registration