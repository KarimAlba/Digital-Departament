import styles from './style.module.scss';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Switcher from '../../ui/Switcher';
import EmailImg from '../../../assets/images/icons/pen-icon.svg';
import AccountAPI from '../../../api/AccountAPI';
import axiosConfig from '../../../api/axiosConfig';
import IEditUser from '../../../models/requests/IEditUserRequest';
import EnumGender from '../../../models/requests/EnumGenderRequest';
import IUserBody from '../../../models/requests/IUserBodyRequest';
import Select from '../../ui/Selector';
import CustomInput from '../../ui/CustomInput';

interface UserDataModalPropsTypes{
    handleFaceClick: Function;
    handleMistakeBorn: Function;
    isInternet: boolean;
};

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
    const [editGender, setEditGender] = useState<string>('');

    const navigate = useNavigate();

    const handleNameChange = (phrase: string) => {
        setUserName(phrase);
    }

    const handleLoginChange = (phrase: string) => {
        setUserLogin(phrase);
    }

    const handleEmailChange = (e: any) => {
        setUserEmail(e.target.value);
    };

    const handleBirthDateChange = (phrase: string) => {
        setUsersBirthDate(phrase);
    };
    const getGender = (value: number) => {
        setGender(value);
    };

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
            setUsersBirthDate((new Date(String(localStorage.getItem('birthDate'))).toLocaleDateString()));
        };
        if (localStorage.getItem('gender')) {
            if (localStorage.getItem('gender') === 'male') {
                setGender(EnumGender.Male);
                setEditGender('male');
            } else {
                setGender(EnumGender.Female);
                setEditGender('female');
            }
        };
        if (localStorage.getItem('career')) {
            setUsersCareer(String(localStorage.getItem('career')));
        };
        if (localStorage.getItem('post')) {
            setUsersPost(String(localStorage.getItem('post')));
        };
    };

    const updateLocalStorage = (user: IUserBody) => {
        localStorage.clear();
        const client: IUserBody = {
            name: user.name,
            login: user.login,
            email: user.email,
            birthDate: user.birthDate,
            gender: editGender,
            career: user.career,
            post: user.post
        };

        fillLocalStorage(client);
    }

    const fillLocalStorage = (person: IUserBody) => {
        localStorage.setItem('name', String(person.name));
        localStorage.setItem('login', String(person.login));
        localStorage.setItem('email', String(person.email));
        localStorage.setItem('birthDate', String(person.birthDate));
        localStorage.setItem('gender', String(person.gender));
        localStorage.setItem('career', String(person.career));
        localStorage.setItem('post', String(person.post));
    };

    const handleCareerChange = (phrase: string) => {setUsersCareer(phrase)};
    const handlePostChange = (phrase: string) => {setUsersPost(phrase)};

    const handleSave = (e: any) => {
        handleMistakeBorn(false);
        e.preventDefault();
        handleFaceClick();
        const user: IEditUser = {
            name: userName,
            login: userLogin,
            email: userEmail,
            gender: editGender,
            birthDate: userBirthDate,
            career: userCareer,
            post: usersPost
        }

        if (user.name && user.login && user.email && user.gender
            && user.birthDate && user.career && user.post && !isInternet    
        ) {
            console.log('😈');
            return
        };

        console.log(user);

        AccountAPI.edit(user)
            .then(response => {
                if (response.status <= 204) {
                    console.log(response);
                    updateLocalStorage(user);
                    axiosConfig.defaults.headers.common['Authorization']  = `Bearer ${response.data.token}`;
                    handleMistakeBorn(false);
                    navigate('/');
                }
            })
            .catch( error => {
                console.log('error - ')
                console.log(error);
                handleMistakeBorn(true);
            })
    };

    useEffect(() => {
        getUserParams();
    }, []);

    useEffect(() => {
        if (gender === 1) {
            setEditGender('male');
        } else {
            setEditGender('female');
        }
    }, [gender])

    return(
        <div className={styles.modal}>

            <button 
                onClick={() => handleFaceClick()}
                className={styles['close-btn']}
            >
                x
            </button>

            <CustomInput type="text" getValue={handleNameChange} defaultValue={String(localStorage.getItem('name'))} placeholderValue='Имя' labelValue='Имя'/>

            <CustomInput type="text" getValue={handleLoginChange} defaultValue={String(localStorage.getItem('login'))} placeholderValue='Логин' labelValue='Логин'/>

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

            <CustomInput 
                type="date" getValue={handleBirthDateChange} 
                defaultValue={(new Date(String(localStorage.getItem('birthDate'))).toLocaleDateString())} 
                placeholderValue='Дата рождения' labelValue='Дата рождения'
            />

            <Switcher getGender={getGender} genderValue={
                    String(localStorage.getItem('gender')) === 'male' 
                        ? EnumGender.Male
                        : EnumGender.Female 
                }
            />

            <Select 
                getResult={handleCareerChange} multiple={false} 
                variation={['ВУЗ', 'Предприятие', 'Другое']}
                defaultValue={String(localStorage.getItem('career'))}
            />
            <Select 
                getResult={handlePostChange} multiple={false} 
                variation={['Преподаватель', 'Студент', 'ПТО', 'Инженер', 'Проектировщик', 'Другое']}
                defaultValue={String(localStorage.getItem('post'))}
            />

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
};

export default UserDataModal;
