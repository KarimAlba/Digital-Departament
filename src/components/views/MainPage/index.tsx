import { useState } from 'react';
import styles from './style.module.scss'
import { Link, Routes, Route } from 'react-router-dom';
import UserDataModal from '../../modals/UserDataModal';
import IUser from '../../../models/IUser';
import PersonalBooks from '../PersonalBooks';
import License from '../License';
import LastBook from '../LastBook';
import Gender from '../../../models/EnumGender';
import Logo from '../../../assets/images/icons/logo-icon.svg';
import Face from '../../../assets/images/icons/face-icon.svg';

const Main = (props: any) => {
    const [userData, setUserData] = useState<boolean>(false);
    const handleFaceClick = () => {setUserData(!userData)};

    const exampleUser: IUser = {
        login: 'karim_skiy',
        password: '111',
        email: 'karim_skiy@mail.ru',
        name: 'Карим Фаткуллин',
        gender: Gender.Male,
        birthDate: '12.01.2001',
        career: 'ВУЗ',
        post: 'Студент'
    }

    return (
        <div 
            className={styles['main-container']} 
        >
            <div className={styles['main-container_head']}>
                <div className={styles.header}>
                    <img src={Logo} alt="" className={styles.logo}/>
                    <input type="text" className={styles.search} onClick={() => setUserData(false)}/>
                    <Link to='lastbook'  className={styles.book} onClick={() => setUserData(false)}></Link>
                    <Link to='/'  className={styles.star} onClick={() => setUserData(false)}></Link>
                    <img src={Face} className={styles.face} onClick={handleFaceClick}/>
                </div>
                <nav>
                    <Link to='personalbooks' onClick={() => setUserData(false)}>Вся литература</Link>
                    <Link to='/' onClick={() => setUserData(false)}>Предметы</Link>
                    <Link to='/' onClick={() => setUserData(false)}>Тэги</Link>
                    <Link to='license' onClick={() => setUserData(false)}>Правообладателям</Link>
                </nav>
            </div>
            <div className={styles['user-library']}>
                {userData
                    ? <UserDataModal 
                        handleFaceClick={handleFaceClick} 
                        exampleUser={exampleUser}
                    /> 
                    : null
                }

                <Routes>
                    <Route index path='personalbooks' element={<PersonalBooks/>}/>
                    <Route path='license' element={<License/>}/>
                    <Route path='lastbook' element={<LastBook/>}/>
                </Routes>
            </div>
        </div>
    )
}

export default Main;
