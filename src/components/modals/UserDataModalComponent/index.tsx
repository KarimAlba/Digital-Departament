import styles from './style.module.scss';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import IUser from '../../../models/IUser';
import UserProffessionModal from '../UserProffesionModalComponent';

interface UserDataModalPropsTypes{
    handleFaceClick: Function;
    exampleUser: IUser;
}

const UserDataModal = (props: UserDataModalPropsTypes) =>{
    const { handleFaceClick, exampleUser } = props;
    const [gender, setGender] = useState<number | undefined>(exampleUser.gender);

    const handleSwitchClick = () => {
        if (gender == 0) {
            setGender(1);
        } else {
            setGender(0);
        }
    }

    const [emailCorrection, setEmailCorrection] = useState<boolean>(true);
    const [userEmail, setUserEmail] = useState<string | undefined>(exampleUser.email);
    const handleEmailChange = (e: any) => {
        e.preventDefault();
        setUserEmail(e.target.value);
    }

    const [abilityPassword, setAbilityPassword] = useState<boolean>(false);
    const [userPassword, setUserPassword] = useState<string | undefined>(exampleUser.password);
    const handlePasswordChange = (e: any) => {
        setUserPassword(e.target.value);
    }

    const [userBirthDate, setUsersBirthDate] = useState<string>('');
    const handleBirthDateChange = (e: any) => {setUsersBirthDate(e.target.value)};

    const [userCareer, setUsersCareer] = useState<string>('');
    const handleCareerChange = (phrase: string) => {setUsersCareer(phrase)};

    const [usersPost, setUsersPost] = useState<string>('');

    return(
        <div className={styles.modal}>
            <button 
                onClick={() => {handleFaceClick()}}
                className={styles['close-btn']}
            >
                x
            </button>
            <h3>Имя</h3>
            <input type="text" name="name" placeholder={exampleUser.name}/>
            <h3>Логин</h3>
            <input type="text" name="login" placeholder={exampleUser.login}/>
            <h3>Электронная почта</h3>
            <div className={styles.email}>
                {emailCorrection? 
                    <div className={styles['email_background']}>
                        {userEmail}
                    </div>
                    :null
                }
                <input 
                    type="text" value={userEmail} 
                    className={styles['email_input']}
                    onInput={handleEmailChange}
                />
                <div 
                    className={styles['email_img']} 
                    onClick={() => {setEmailCorrection(!emailCorrection)}}
                >
                </div>
            </div>
            <h3>Пароль</h3>
            {abilityPassword?
                <input
                    className={styles['password-input']} 
                    type="text" value={userPassword} 
                    onInput={handlePasswordChange}
                    onBlur={() => setAbilityPassword(false)}
                />:
                <button className={styles.password} onClick={() => setAbilityPassword(true)}>Сменить пароль</button> 
            }
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
                    style={gender == 1? {color: '#FF3C82', fontWeight:700}: {color: '#C1CAD2'}}
                >
                    Ж
                </span>
            </div>
            <div style={{position: 'relative'}}>
                <UserProffessionModal handleCareerChange={handleCareerChange}/>
            </div>
            <input 
                type="text"  placeholder='Должность'
                onInput={(e:any) => setUsersPost(e.target.value)}
            />
            <div className={styles.btns}>
                <button>Сохранить</button>
                <button className={styles.exit}>
                    <Link to='/'>
                        Выйти
                    </Link>
                </button>
            </div>
        </div>
    )
}

export default UserDataModal