import { useEffect, useState } from 'react';
import styles from './style.module.scss'
import { Link } from 'react-router-dom';
import IUser from '../../../models/IUser';
import UserProffessionModal from '../../modals/UserProffesionModal';
import AccountAPI from '../../../api/AccountAPI';
import UserPostModal from '../../modals/UserPostModal';
import Checkbox from '../Checkbox';
import Password from '../Password';
import EyeImg from '../../../assets/images/icons/eye-icon.svg';
import MistakeModal from '../../modals/MistakeModal';

const Registration = (props: any) => {
    const [gender, setGender] = useState<number>(0);
    const [userName, setUsersName] = useState<string>('');
    const [userLogin, setUsersLogin] = useState<string>('');
    const [userEmail, setUsersEmail] = useState<string>('');
    const [userPassword, setUsersPassword] = useState<string>('');
    const [correctPassword, setCorrectPassword] = useState<boolean>(true);
    const [userBirthDate, setUsersBirthDate] = useState<string>('');
    const [userPost, setUsersPost] = useState<string>(''); 
    const [newUser, setNewUser] = useState<IUser | {}>({});

    const [correctName, setCorrectName] = useState<boolean>(true);
    const [correctLogin, setCorrectLogin] = useState<boolean>(true);
    const [correctEmail, setCorrectEmail] = useState<boolean>(true);
    const [isActiveRepeatPassword, setIsActiveRepeatPassword] = useState<boolean>(false);
    const [showedRepeatPassword, setShowedRepeatPassword] = useState<boolean>(false); 
    const [userCareer, setUsersCareer] = useState<string>('');
    const [registrationReady, setRegistrationReady] = useState<boolean>(true);
    const [isOpenCareer, setIsOpenCareer] = useState<boolean>(false);
    const [isOpenPost, setIsOpenPost] = useState<boolean>(false);

    const openModals = () => {
        setIsOpenCareer(false);
        setIsOpenPost(false);
    }

    const passwordChecking = (e: any) => {
        e.target.value === userPassword?
            setCorrectPassword(true):
            setCorrectPassword(false);
    }

    const handleNameChange = (e: any) => {
        setUsersName(e.target.value);
        checkNameValue(e.target.value);
    }
    const handleLoginChange = (e: any) => {
        setUsersLogin(e.target.value);
        checkLoginValue(e.target.value);
    }

    const handleEmailChange = (e: any) => {
        setUsersEmail(e.target.value);
        checkEmailValue(e.target.value);
    }

    const handleBirthDateChange = (e: any) => {
        setUsersBirthDate(e.target.value);
    }

    const handlePostChange = (phrase: string) => {setUsersPost(phrase)}
    const handleCareerChange = (phrase: string) => {setUsersCareer(phrase)}
    const getPasswordValue = (phrase: string) => {setUsersPassword(phrase)}; 

    const sendReq = (user: IUser) => {
        AccountAPI.registration(user)
            .then(response => console.log(response))
            .catch(error => console.log(error))
    }

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

    const checkRegistrationReady = () => {
        if (userName && correctName && userLogin && correctLogin 
                && userEmail && correctEmail
                && userPassword && userBirthDate && correctPassword 
                && userCareer && userPost
            ) {
            setRegistrationReady(true);
        } else {
            setRegistrationReady(false);
        }
    }

    const checkNameValue = (phrase: string) => {
        if ( phrase.search(/\d/) != -1 ) { 
            setCorrectName(false);
        } else {
            setCorrectName(true);
        }
    }

    const checkLoginValue = (phrase: string) => {
        if (phrase.length >= 6) {
            setCorrectLogin(true);
        } else {
            setCorrectLogin(false);
        }
    }

    const checkEmailValue = (phrase: string) => {
        const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
        if (EMAIL_REGEXP.test(phrase)) {
            setCorrectEmail(true);
        } else {
            setCorrectEmail(false);
        }
    }

    const getGender = (value: number) => {
        setGender(value);
    }

    useEffect(() => {
        checkRegistrationReady();
    }, [userPost]);

    return(
        <div className='background'>
            <div className={styles.registration}>
                <h2>Регистрация</h2>
                <div className={styles['columns-container']}>
                    <div className={styles.column}>
                        <input 
                            type="text" placeholder="Имя" onInput={handleNameChange}
                            style={correctName
                                ? {border: '1px solid #C1CAD2'}
                                : {border: '1px solid red'}
                            }
                        />
                        <input 
                            type="text" placeholder="Логин" onInput={handleLoginChange}
                            style={correctLogin
                                ? {border: '1px solid #C1CAD2'}
                                : {border: '1px solid red'}  
                            }
                            onClick={() => openModals()}
                        />
                        <input 
                            type="email" placeholder="Email" onInput={handleEmailChange}
                            style={correctEmail
                                ? {border: '1px solid #C1CAD2'}
                                : {border: '1px solid red'}  
                            }
                            onClick={() => openModals()}
                        />
                        <Password getPasswordValue={getPasswordValue}/>  
                        <div  
                            className={styles.password}
                            onClick={() => openModals()}
                        >
                           {isActiveRepeatPassword
                                ? <label htmlFor="repeat-password">Повторите пароль</label>
                                : null
                            }
                            {isActiveRepeatPassword
                                ? <input 
                                    type={showedRepeatPassword
                                        ? "text"
                                        : "password"
                                    } 
                                    placeholder="Повторите пароль"
                                    onInput={passwordChecking} name='repeat-password'
                                    onClick={() => setIsActiveRepeatPassword(true)}
                                    style={
                                        correctPassword
                                        ? {borderRadius:'0px', border: 'none', borderBottom:'1px solid #309FFF'}
                                        : {borderRadius:'0px', border: 'none', borderBottom: '1px solid red'}
                                    }
                                />
                                : <input 
                                    type="text"  placeholder="Повторите пароль" 
                                    onClick={() => {setIsActiveRepeatPassword(true)}}
                                    onInput={() => {setIsActiveRepeatPassword(true)}}
                                />
                            }
                            {isActiveRepeatPassword
                                ? <img 
                                    src={EyeImg} alt="a" className={styles['password_eye']}
                                    onClick={() => setShowedRepeatPassword(!showedRepeatPassword)}
                                />
                                : null
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
                            onClick={() => openModals()}
                            onInput={handleBirthDateChange} 
                            min="1946-01-01" max="2020-12-31"
                        />
                        <Checkbox getGender={getGender}/>
                        <div style={{position: 'relative'}}>
                            <UserProffessionModal handleCareerChange={handleCareerChange} isOpenCareer={isOpenCareer}/>
                        </div>
                        <UserPostModal handlePostChange={handlePostChange} isOpenPost={isOpenPost}/>
                        {!registrationReady
                            ? <div className={styles['registration-back']}></div> 
                            : null 
                        }
                            <button 
                                className={styles['reg-btn']}
                                onClick={handleReqistrationClick}
                            >
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

export default Registration;
