import { useState } from 'react';
import styles from './RegistrationComponent.module.scss';
import { Link } from 'react-router-dom';
import IUser from '../../models/IUser';

const Registration = (props: any) => {
    const [sexMan, setSexMan] = useState<boolean>(true);
    const [userName, setUsersName] = useState<string>('');
    const [userLogin, setUsersLogin] = useState<string>('');
    const [userEmail, setUsersEmail] = useState<string>('');
    const [userPassword, setUsersPassword] = useState<string>('');
    const [userBirthday, setUsersBirthday] = useState<string>('');
    const [userSex, setUserSex] = useState<string>('');
    const [userProfession, setUsersProfession] = useState<string>('');
    const [userPosition, setUsersPosition] = useState<string>(''); 

    const [correctPassword, setCorrectPassword] = useState<boolean>(true);

    const passwordChecking = (e: any) => {
        e.target.value == userPassword?
            setCorrectPassword(true):
            setCorrectPassword(false)
    }
    
    const handleSwitchClick = () => {
        setSexMan(!sexMan);
        handleSexChange(!sexMan);
    }

    const handleNameChange = (e: any) => {setUsersName(e.target.value)}
    const handleLoginChange = (e: any) => {setUsersLogin(e.target.value)}
    const handleEmailChange = (e: any) => {setUsersEmail(e.target.value)}
    const handlePasswordChange = (e: any) => {setUsersPassword(e.target.value)}
    const handleBirthdayChange = (e: any) => {setUsersBirthday(e.target.value)}
    const handleSexChange = (sex: boolean) => {
        if (sex) {
            setUserSex('male')
        } else setUserSex('female')
    }
    const handleProffesionChange = (e: any) => {setUsersProfession(e.target.value)}
    const handlePositionChange = (e: any) => {setUsersPosition(e.target.value)}

    const [newUser, setNewUser] = useState<IUser | {}>({});

    const handleReqistrationClick = () => {
        const user: IUser = {
            name: userName,
            login: userLogin,
            email: userEmail,
            password: userPassword,
            birthday: userBirthday,
            sex: userSex,
            proffession: userProfession,
            position: userPosition
        }

        setNewUser(user);
        console.log(user);
    }

    return(
        <div className='background'>
            <div className={styles.registration}>
                <h2>Регистрация</h2>
                <div className={styles['columns-container']}>
                    <div className={styles.column}>
                        <input type="text" placeholder="Имя" onInput={handleNameChange}/>
                        <input type="text" placeholder="Логин" onInput={handleLoginChange}/>
                        <input type="text" placeholder="Email" onInput={handleEmailChange}/>
                        <label htmlFor="password">Пароль</label>
                        <input 
                            type="password" className={styles.password}
                            name="password" placeholder='Введите пароль'
                            onInput={handlePasswordChange}
                        />
                        <input 
                            type="password" placeholder="Повторите пароль"
                            onInput={passwordChecking}
                            style={correctPassword?
                                {border:'border: 1px solid #C1CAD2'}: 
                                {border: '1px solid red'}
                            }
                        />
                    </div>

                    <div className={styles.column}>
                        <input 
                            placeholder='Дата рождения'
                            name='birthday'
                            className={styles['date-input']}
                            type="text"
                            onFocus={(e:any) => e.target.type = 'date'}
                            onBlur={(e:any) => e.target.type = 'text'}
                            onInput={handleBirthdayChange} 
                            min="1946-01-01" max="2020-12-31"
                        />
                        <div className='switcher'>
                            <span className='switcher_sex' style={sexMan?{color: '#0488FD', fontWeight:700}: {color: '#C1CAD2'}}>M</span>
                            <label className='switch'>
                                <input type="checkbox"  onClick={handleSwitchClick}/>
                                <span className="slider round"></span>
                            </label>
                            <span className='switcher_sex' style={sexMan? {color: '#C1CAD2'}: {color: '#FF3C82', fontWeight:700}}>Ж</span>
                        </div>
                        <input 
                            type="text" placeholder="Род деятельности"
                            onInput={handleProffesionChange}
                        />
                        <input 
                            type="text" placeholder="Должность"
                            onInput={handlePositionChange}
                        />
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

export default Registration