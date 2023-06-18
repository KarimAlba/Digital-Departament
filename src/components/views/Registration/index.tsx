import { useEffect, useState } from 'react';
import styles from './style.module.scss'
import { useNavigate } from 'react-router-dom';
import IUser from '../../../models/request/IUser';
import AccountAPI from '../../../api/AccountAPI';
import Switcher from '../Switcher';
import Password from '../Password';
import EyeImg from '../../../assets/images/icons/eye-icon.svg';
import MistakeModal from '../../modals/MistakeModal';
import EnumGender from '../../../models/request/EnumGender';
import InternetModal from '../../modals/InternetModal';
import Select from '../Selector';

const Registration = (props: any) => {
    const [gender, setGender] = useState<EnumGender>(EnumGender.Male);
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
    const [mistakesArr, setMistakesArr] = useState<string[]>([]);
    const [isOpenMistakes, setIsOpenMistakes] = useState<boolean>(false);
    const [internetConnection, setInternetConnection] = useState<boolean>(false); 

    const navigate = useNavigate();

    const passwordChecking = (e: any) => {
        e.target.value === userPassword?
            setCorrectPassword(true):
            setCorrectPassword(false);
    };

    const handleNameChange = (e: any) => {
        setUsersName(e.target.value);
        checkNameValue(e.target.value);
    };

    const handleLoginChange = (e: any) => {
        setUsersLogin(e.target.value);
        checkLoginValue(e.target.value);
    };

    const handleEmailChange = (e: any) => {
        setUsersEmail(e.target.value);
        checkEmailValue(e.target.value);
    };

    const handleBirthDateChange = (e: any) => {
        setUsersBirthDate(e.target.value);
    };

    const handlePostChange = (phrase: string) => {setUsersPost(phrase)};
    const handleCareerChange = (phrase: string) => {setUsersCareer(phrase)};
    const getPasswordValue = (phrase: string) => {setUsersPassword(phrase)}; 

    const sendReq = (user: IUser) => {
        AccountAPI.registration(user)
            .then(response => console.log(response))
            .catch(error => {
                if (error.response.status === 400) {
                    mistakesArr.push(error.response.data.message);
                    setMistakesArr([...mistakesArr]);
                }
            })
    };

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

        console.log(gender);
        setNewUser(user);
        sendReq(user);
        checkRegistrationReady();
    };

    const checkRegistrationReady = () => {
        const phraseArr: string[] = [];

        if (!userName) {
            phraseArr.push('Заполните поле "Имя"');
        }

        if (!correctName) {
            phraseArr.push('Некорректно заполнено поле "Имя"');
        }

        if (!userLogin) {
            phraseArr.push('Заполните поле "Логин"');
        }

        if (!correctLogin) {
            phraseArr.push('Поле "Логин" должно состоять не менее чем из 6 символов');
        }

        if (!userEmail) {
            phraseArr.push('Заполните поле "Email"');
        }

        if (!correctEmail) {
            phraseArr.push('Некорректно заполнено поле "Email"');
        }

        if (!userPassword) {
            phraseArr.push('Заполните поле "Пароль"');
        }

        if (!correctPassword) {
            phraseArr.push('Пароли не совпадают');
        }

        if (!userBirthDate) {
            phraseArr.push('Заполните поле "Дата рождения"');
        }

        if (!userCareer) {
            phraseArr.push('Заполните поле "Род деятельности"');
        }

        if (!userPost) {
            phraseArr.push('Заполните поле "Должность"');
        }

        if (!internetConnection) {
            phraseArr.push('Отсутствует подключение к интернету');
        }

        if (phraseArr.length > 0) {
            setMistakesArr(phraseArr);
            setIsOpenMistakes(true);
        } else {
            navigate('/');
            setIsOpenMistakes(false);
        }
    };

    const checkNameValue = (phrase: string) => {
        if ( phrase.search(/\d/) != -1 ) { 
            setCorrectName(false);
        } else {
            setCorrectName(true);
        }
    };

    const checkLoginValue = (phrase: string) => {
        if (phrase.length >= 6) {
            setCorrectLogin(true);
        } else {
            setCorrectLogin(false);
        }
    };

    const checkEmailValue = (phrase: string) => {
        const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
        if (EMAIL_REGEXP.test(phrase)) {
            setCorrectEmail(true);
        } else {
            setCorrectEmail(false);
        }
    };

    const getGender = (value: EnumGender) => {
        setGender(value);
    };

    const getInternet = (value: boolean) => {setInternetConnection(value)};

    return(
        <div className='background'>
            <InternetModal getInternet={getInternet}/>
            {isOpenMistakes? <MistakeModal phraseArr={mistakesArr}/> : null}
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
                        />
                        <input 
                            type="email" placeholder="Email" onInput={handleEmailChange}
                            style={correctEmail
                                ? {border: '1px solid #C1CAD2'}
                                : {border: '1px solid red'}  
                            }
                        />
                        <Password getPasswordValue={getPasswordValue}/>  
                        <div  
                            className={styles.password}
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
                            onInput={handleBirthDateChange} 
                            min="1946-01-01" max="2020-12-31"
                        />
                        <Switcher getGender={getGender} genderValue={gender}/>
                        <Select 
                            getResult={handleCareerChange} multiple={false} 
                            variation={['ВУЗ', 'Предприятие', 'Другое']}
                            defaultValue='Род деятельности'
                        />
                        <Select 
                            getResult={handlePostChange} multiple={false} 
                            variation={['Преподаватель', 'Студент', 'ПТО', 'Инженер', 'Проектировщик', 'Другое']}
                            defaultValue='Должность'
                        />
                        <button 
                            className={styles['reg-btn']}
                            onClick={handleReqistrationClick}
                        >
                            Зарегистрироваться  
                        </button>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Registration;
