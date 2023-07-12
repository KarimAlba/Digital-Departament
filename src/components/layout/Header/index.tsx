import { useState } from 'react';
import styles from './style.module.scss'
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import UserDataModal from '../../modals/UserDataModal';
import License from '../../views/License';
import OpenedBook from '../../views/OpenedBook';
import Logo from '../../../assets/images/icons/logo-icon.svg';
import Face from '../../../assets/images/icons/face-icon.svg';
import MistakeModal from '../../modals/MistakeModal/index';
import InternetModal from '../../modals/InternetModal';
import Favourites from '../../views/Favourites';
import Welcoming from '../../views/Welcoming';
import Library from '../../views/Library';
import TagsPage from '../../views/TagsPage';
import CreationImg from '../../../assets/images/icons/create-publication-icon.svg';
import CreationPage from '../../views/CreationPage';
import SubjectsModal from '../../modals/SubjectsModal';
import BookImg from '../../../assets/images/icons/book-icon.svg';

const Header = (props: any) => {
    const [userData, setUserData] = useState<boolean>(false);
    const [isOpenMistakes, setIsOpenMistakes] = useState<boolean>(false);
    const [isOpenSubjects, setIsOpenSubjects] = useState<boolean>(false);
    const [isInternet, setIsInternet] = useState<boolean>(false);
    const [subjectProps, setSubjectProps] = useState<{id: number, name: string}>();
    const [tagProps, setTagProps] = useState<{id: number, name: string}>();
    const handleFaceClick = () => {setUserData(!userData)}; 
    const handleMistakeBorn = (value: boolean) => {setIsOpenMistakes(value)};
    const getInternet = (value: boolean) => {setIsInternet(value)};

    const navigate = useNavigate();

    const handleCreationClick = () => {
        setUserData(false);
        navigate('creation');
    };

    const handleSubjectsClick = () => {
        setIsOpenSubjects(!isOpenSubjects);
    };

    const handleSubjectSelect = (item: {id: number, name: string}) => {
        setIsOpenSubjects(false);
        setSubjectProps(item);
    };

    const handleTagSelect = (item: {id: number, name: string}) => {
        setTagProps(item);
    }; 

    const handleOpenedBookClick = () => {
        setUserData(false)
        if (localStorage.getItem('id')) {
            navigate(`library/:${localStorage.getItem('id')}`);
        } else {
            console.log(localStorage.getItem('id'));
        };
    };

    const handleLibraryClick = () => {
        setUserData(false);
    }

    return (
        <div 
            className={styles['main-container']} 
        >
            <InternetModal getInternet={getInternet}/>
            {isOpenMistakes ? <MistakeModal phraseArr = {['Некорректно заполненные поля']}/> : null}
            <div className={styles['main-container_head']}>
                <div className={styles.header}>
                    <img 
                        src={Logo} 
                        alt="" 
                        className={styles.logo}
                    />
                    <input 
                        type="text" 
                        className={styles.search} 
                        onClick={() => setUserData(false)}
                    />
                    <img 
                        src={BookImg}
                        className={styles.book} 
                        onClick={handleOpenedBookClick}
                    />
                    <Link 
                        to='favourites' 
                        className={styles.star} 
                        onClick={handleLibraryClick}
                    >
                    </Link>
                    <img 
                        src={CreationImg} 
                        className={styles['creation-img']} 
                        onClick={handleCreationClick}
                    />
                    <img 
                        src={Face} 
                        className={styles.face} 
                        onClick={handleFaceClick}
                    />
                </div>
                <nav>
                    <Link 
                        to='library' 
                        onClick={() => setUserData(false)}
                        state={{ tagId: null }}
                    >
                        Вся литература
                    </Link>
                    <div className={styles.subjects}>
                        <button onClick={handleSubjectsClick}>Предметы</button>
                        {isOpenSubjects
                            ? <SubjectsModal setOpenStatus={handleSubjectSelect}/>
                            : null
                        }
                    </div>
                    <Link to='tags' onClick={() => setUserData(false)}>
                        Тэги
                    </Link>
                    <Link 
                        to='license' onClick={() => setUserData(false)}
                    >
                        Правообладателям
                    </Link>
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
                    <Route path='welcoming' element={<Welcoming/>}/>
                    <Route 
                        path='library' 
                        element={
                            <Library 
                                subjectValue={subjectProps} 
                                tagValue={tagProps}
                            />
                        }
                    />
                    <Route path='library/:id' element={<OpenedBook/>}/>
                    <Route path='license' element={<License/>}/>
                    <Route path='openedbook' element={<OpenedBook/>}/>
                    <Route path='favourites' element={<Favourites/>}/>
                    <Route path='tags' element={<TagsPage setSubject={handleTagSelect}/>}/>
                    <Route path='creation' element={<CreationPage/>}/>
                </Routes>
            </div>
        </div>
    )
}

export default Header;
