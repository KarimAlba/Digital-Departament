import styles from './style.module.scss'
import { useState } from 'react';
import IUser from '../../../models/IUser'

interface UserDataModalPropsTypes{
    handleFaceClick: Function;
    exampleUser: IUser;
}

const UserDataModal = (props: UserDataModalPropsTypes) =>{
    const { handleFaceClick, exampleUser } = props;
    const [sexMan, setSexMan] = useState<boolean>(true);
    const [userSex, setUserSex] = useState<string>('');
    const handleSwitchClick = () => {
        setSexMan(!sexMan);
        handleSexChange(!sexMan);
    }
    const handleSexChange = (sex: boolean) => {
        if (sex) {
            setUserSex('male')
        } else setUserSex('female')
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

    const [userBirthday, setUsersBirthday] = useState<string>('');
    const handleBirthdayChange = (e: any) => {setUsersBirthday(e.target.value)};

    return(
        <div className={styles.modal}>
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
                <div className={styles['email_img']} onClick={() => {setEmailCorrection(!emailCorrection)}}></div>
            </div>
            <h3>Пароль</h3>
            {abilityPassword?
                <input 
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
            <input type="text" placeholder='Род деятельности' className={styles.proffession}/>
            <input type="text"  placeholder='Должность'/>
            <div className={styles.btns}>
                <button>Сохранить</button>
                <button 
                    onClick={() => {handleFaceClick()}}
                    className={styles.exit}
                >
                    Выйти
                </button>
            </div>
        </div>
    )
}

export default UserDataModal