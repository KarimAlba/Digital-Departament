import styles from './style.module.scss';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import IUser from '../../../models/IUser';
import UserProffessionModal from '../UserProffesionModal';
import Checkbox from '../../views/Checkbox';
import EmailImg from '../../../assets/images/icons/pen-icon.svg';
import UserPostModal from '../UserPostModal';

interface UserDataModalPropsTypes{
    handleFaceClick: Function;
    exampleUser: IUser;
}

const UserDataModal = (props: UserDataModalPropsTypes) => {
    const { handleFaceClick, exampleUser } = props;

    const [emailCorrection, setEmailCorrection] = useState<boolean>(true);
    const [userEmail, setUserEmail] = useState<string | undefined>(exampleUser.email);
    const [userPassword, setUserPassword] = useState<string | undefined>(exampleUser.password);
    const [userBirthDate, setUsersBirthDate] = useState<string>('');
    const [gender, setGender] = useState<number | undefined>(exampleUser.gender);
    const [userCareer, setUsersCareer] = useState<string>('');
    const [usersPost, setUsersPost] = useState<string>('');

    const [abilityPassword, setAbilityPassword] = useState<boolean>(false);
    const [isOpenCareer, setIsOpenCareer] = useState<boolean>(false);
    const [isOpenPost, setIsOpenPost] = useState<boolean>(false);

    const openModals = () => {
        setIsOpenCareer(false);
        setIsOpenPost(false);
    }

    const handleEmailChange = (e: any) => {
        e.preventDefault();
        setUserEmail(e.target.value);
    }

    const handlePasswordChange = (e: any) => {
        setUserPassword(e.target.value);
    }

    const handleBirthDateChange = (e: any) => {setUsersBirthDate(e.target.value)};

    const getGender = (value: number) => {
        setGender(value);
    }

    const handleCareerChange = (phrase: string) => {setUsersCareer(phrase)};

    const handlePostChange = (phrase: string) => {setUsersPost(phrase)};

    return(
        <div className={styles.modal} onBlur={() => handleFaceClick()}>
            <button 
                onClick={() => handleFaceClick()}
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
                {emailCorrection
                    ? <div className={styles['email_background']}>
                        {userEmail}
                    </div>
                    : null
                }
                <input 
                    type="text" value={userEmail} 
                    className={styles['email_input']}
                    onInput={handleEmailChange}
                />
                <img 
                    className={styles['email_img']} 
                    src={EmailImg} alt="" 
                    onClick={() => {setEmailCorrection(!emailCorrection)}}
                />
            </div>
            <h3>Пароль</h3>
            {abilityPassword
                ? <input
                    className={styles['password-input']} 
                    type="text" value={userPassword} 
                    onInput={handlePasswordChange}
                    onBlur={() => setAbilityPassword(false)}
                />
                : <button 
                    className={styles.password} 
                    onClick={() => setAbilityPassword(true)}
                >
                    Сменить пароль
                </button> 
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
            <Checkbox getGender={getGender} genderValue={exampleUser.gender}/>
            <div style={{position: 'relative'}}>
                <UserProffessionModal handleCareerChange={handleCareerChange} isOpenCareer={isOpenCareer}/>
            </div>
            <UserPostModal handlePostChange={handlePostChange} isOpenPost={isOpenPost}/>
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

export default UserDataModal;
