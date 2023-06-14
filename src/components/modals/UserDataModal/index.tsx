import styles from './style.module.scss';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserProffessionModal from '../UserProffesionModal';
import Switcher from '../../views/Switcher';
import EmailImg from '../../../assets/images/icons/pen-icon.svg';
import UserPostModal from '../UserPostModal';
import AccountAPI from '../../../api/AccountAPI';
import IServerUser from '../../../models/IServerUser';
import axiosConfig from '../../../api/axiosConfig';
import IEditUser from '../../../models/IEditUser';
import EnumGender from '../../../models/EnumGender';

interface UserDataModalPropsTypes{
    handleFaceClick: Function;
    handleMistakeBorn: Function;
    isInternet: boolean;
}

const UserDataModal = (props: UserDataModalPropsTypes) => {
    const { handleFaceClick, handleMistakeBorn, isInternet } = props;

    const [emailCorrection, setEmailCorrection] = useState<boolean>(true);
    const [userName, setUserName] = useState<string>('');
    const [userLogin, setUserLogin] = useState<string>('');
    const [userEmail, setUserEmail] = useState<string>('');
    const [userBirthDate, setUsersBirthDate] = useState<string>('');
    const [gender, setGender] = useState<EnumGender>(EnumGender.Male);
    const [userCareer, setUsersCareer] = useState<string>('');
    const [usersPost, setUsersPost] = useState<string>('');

    const handleEmailChange = (e: any) => {
        e.preventDefault();
        setUserEmail(e.target.value);
    }

    const handleBirthDateChange = (e: any) => {setUsersBirthDate(e.target.value)};

    const getGender = (value: number) => {
        setGender(value);
    }

    const getUserParams = () => {
        if (localStorage.getItem('name')) {
            setUserName(String(localStorage.getItem('name')));
        };
        if (localStorage.getItem('login')) {
            setUserLogin(String(localStorage.getItem('login')));
        };
        if (localStorage.getItem('email')) {
            setUserEmail(String(localStorage.getItem('email')));
        };
        if (localStorage.getItem('birthDate')) {
            setUsersBirthDate(new Date(String(localStorage.getItem('birthDate'))).toLocaleDateString());
        };
        if (localStorage.getItem('gender')) {
            if (localStorage.getItem('gender') === 'male') {
                setGender(EnumGender.Male);
            } else {
                setGender(EnumGender.Female);
            }
        };
        if (localStorage.getItem('career')) {
            setUsersCareer(String(localStorage.getItem('career')));
        };
        if (localStorage.getItem('post')) {
            setUsersPost(String(localStorage.getItem('post')));
        };
    }

    const fillLocalStorage = (person: IServerUser) => {
        localStorage.setItem('name', String(person.name));
        localStorage.setItem('login', String(person.login));
        localStorage.setItem('email', String(person.email));
        localStorage.setItem('birthDate', String(person.birthDate));
        localStorage.setItem('gender', String(person.gender));
        localStorage.setItem('career', String(person.career));
        localStorage.setItem('post', String(person.post));
    }

    const handleCareerChange = (phrase: string) => {setUsersCareer(phrase)};
    const handlePostChange = (phrase: string) => {setUsersPost(phrase)};

    const sendReq = (user: IEditUser) => {
        if (user.name && user.login && user.email && user.gender
            && user.birthDate && user.career && user.post && isInternet    
        ) {
            console.log('😈');
            return
        };

        AccountAPI.edit(user)
            .then(response => {
                if (response.status <= 204) {
                    console.log(response);
                    const user = response.data.user;
                    fillLocalStorage(user);
                    axiosConfig.defaults.headers.common['Authorization']  = `Bearer ${response.data.token}`;
                    handleMistakeBorn(false);
                }
            })
            .catch( error => {
                console.log(error);
                handleMistakeBorn(true);
            })
    }

    const handleSave = (e: any) => {
        handleMistakeBorn(false);
        e.preventDefault();
        handleFaceClick();
        const user: IEditUser = {
            name: userName,
            login: userLogin,
            email: userEmail,
            gender: gender,
            birthDate: userBirthDate,
            career: userCareer,
            post: usersPost
        }

        sendReq(user);
    }

    useEffect(() => {
        getUserParams();
    }, [])

    useEffect(() => {
        console.log(gender);
    }, [gender])

    return(
        <div className={styles.modal}>

            <button 
                onClick={() => handleFaceClick()}
                className={styles['close-btn']}
            >
                x
            </button>

            <h3>Имя</h3>
            <input type="text" name="name" defaultValue={userName}/>

            <h3>Логин</h3>
            <input type="text" name="login" defaultValue={userLogin}/>

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
            <input 
                placeholder='Дата рождения'
                name='birthday'
                className={styles['date-input']}
                type="text"
                defaultValue={userBirthDate}
                onFocus={(e:any) => e.target.type = 'date'}
                onBlur={(e:any) => e.target.type = 'text'}
                onInput={handleBirthDateChange} 
                min="1946-01-01" max="2020-12-31"
            />

            <Switcher getGender={getGender} genderValue={EnumGender.Male}/>

            <div style={{position: 'relative'}}>
                <UserProffessionModal handleCareerChange={handleCareerChange} defVal={userCareer}/>
            </div>

            <UserPostModal handlePostChange={handlePostChange} defVal={usersPost}/>

            <div className={styles.btns}>
                <button onClick={(e: any) => handleSave(e)}>Сохранить</button>
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
