import { useState } from 'react';
import styles from './style.module.scss'
import { Link, Routes, Route } from 'react-router-dom';
import UserDataModal from '../modals/UserDataModalComponent';
import IUser from '../../models/IUser';
import PersonalBooks from '../PersonalBooksComponent';
import License from '../LicenseComponent';
import LastBook from '../LastBookComponent';

const Main = (props: any) => {
    const [userData, setUserData] = useState<boolean>(false);
    const handleFaceClick = () => {setUserData(!userData)};

    const exampleUser: IUser = {
        login: 'karim_skiy',
        password: '111',
        email: 'karim_skiy@mail.ru',
        name: 'Карим Фаткуллин',
        gender: 0
    }

    return (
        <div className={styles['main-container']}>
            <div className={styles['main-container_head']}>
                <header>
                    <div className={styles.logo}></div>
                    <input type="text" className={styles.search}/>
                    <Link to='lastbook'  className={styles.book}></Link>
                    <Link to='/'  className={styles.star}></Link>
                    <div className={styles.face} onClick={handleFaceClick}></div>
                </header>
                <nav>
                    <Link to='personalbooks'>Вся литература</Link>
                    <Link to='/'>Предметы</Link>
                    <Link to='/'>Тэги</Link>
                    <Link to='license'>Правообладателям</Link>
                </nav>
            </div>
            <div className={styles['user-library']}>
                {userData? 
                    <UserDataModal handleFaceClick={handleFaceClick} exampleUser={exampleUser}/> 
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