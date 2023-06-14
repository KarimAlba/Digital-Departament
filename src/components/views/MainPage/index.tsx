import { useState, useEffect } from 'react';
import styles from './style.module.scss'
import { Link, Routes, Route } from 'react-router-dom';
import UserDataModal from '../../modals/UserDataModal';
import PersonalBooks from '../PersonalBooks';
import License from '../License';
import LastBook from '../LastBook';
import Logo from '../../../assets/images/icons/logo-icon.svg';
import Face from '../../../assets/images/icons/face-icon.svg';
import MistakeModal from '../../modals/MistakeModal/index';
import InternetModal from '../../modals/InternetModal';

const Main = (props: any) => {
    const [userData, setUserData] = useState<boolean>(false);
    const [isOpenMistakes, setIsOpenMistakes] = useState<boolean>(false);
    const [isInternet, setIsInternet] = useState<boolean>(false);
    const handleFaceClick = () => {setUserData(!userData)}; 
    const handleMistakeBorn = (value: boolean) => {setIsOpenMistakes(value)};
    const getInternet = (value: boolean) => {setIsInternet(value)};

    return (
        <div 
            className={styles['main-container']} 
        >
            <InternetModal getInternet={getInternet}/>
            {isOpenMistakes ? <MistakeModal phraseArr = {['Некорректно заполненные поля']}/> : null}
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
                        handleMistakeBorn={handleMistakeBorn}
                        isInternet={isInternet}
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
