import styles from './style.module.scss';
import { useState } from 'react';

interface UserPostModalPropsTypes{
    handlePostChange: Function;
    isOpenPost: boolean;
}

const UserPostModal = (props: UserPostModalPropsTypes) => {
    const { handlePostChange, isOpenPost }= props;
    const [selectedPost, setSelectedPost] = useState<string>('');
    const [isOpen, setIsOpen] = useState<boolean>(isOpenPost);
    const [isOpenOther, setIsOpenOther] = useState<boolean>(false);

    const setUserCareer = (e: any) => {
        handlePostChange(e.target.value);
    };

    const setTeacher = () => {
        setSelectedPost('Преподаватель');
        setIsOpen(false);
        handlePostChange('Преподаватель');
    };

    const setStudent = () => {
        setSelectedPost('Студент');
        setIsOpen(false);
        handlePostChange('Студент');
    };

    const setPTO = () => {
        setSelectedPost('ПТО');
        setIsOpen(false);
        handlePostChange('ПТО');
    };

    const setEngineer = () => {
        setSelectedPost('Инженер');
        setIsOpen(false);
        handlePostChange('Инженер');
    };

    const setPlanner = () => {
        setSelectedPost('Проектировщик');
        setIsOpen(false);
        handlePostChange('Проектировщик');
    };

    const setDesigner = () => {
        setSelectedPost('Дизайнер');
        setIsOpen(false);
        handlePostChange('Дизайнер');
    };

    const setCurios = () => {
        setSelectedPost('Любопытствующий');
        setIsOpen(false);
        handlePostChange('Любопытствующий');
    };

    const setOther = () => {
        setIsOpen(false);
        setIsOpenOther(true);
    };

    const getResultOfOther = (e: any) => {
        setSelectedPost(e.target.value);
        handlePostChange(e.target.value);
    };

    const handleBlurOther = (e: any) => {
        if (!e.target.value) {
            setIsOpen(false);
            setIsOpenOther(false);
        };
    };

    return (
        <div className={styles['post-container']}>
            {isOpenOther
                ? (<input 
                    type="text" placeholder="Другое"
                    onInput={(e: any) => setUserCareer(e)}
                    onBlur={(e: any) => handleBlurOther(e)}
                />)
                : isOpen
                    ? (<div>
                        <input 
                            type="text" defaultValue={selectedPost}
                        />
                        <ul className={styles.list}>
                            <li onClick={() => setTeacher()}>Преподаватель</li>
                            <li onClick={() => setStudent()}>Студент</li>
                            <li onClick={() => setPTO()}>ПТО</li>
                            <li onClick={() => setEngineer()}>Инженер</li>
                            <li onClick={() => setPlanner()}>Проектировщик</li>
                            <li onClick={() => setDesigner()}>Дизайнер</li>
                            <li onClick={() => setCurios()}>Любопытствующий</li>
                            <li onClick={() => setOther()}>Другое</li>
                        </ul>
                    </div>)
                    : (<input 
                        type="text" placeholder='Должность'
                        defaultValue={selectedPost? selectedPost: ''} 
                        onClick={() => setIsOpen(true)}
                    />)
            }
        </div>
    )
}  

export default UserPostModal;
