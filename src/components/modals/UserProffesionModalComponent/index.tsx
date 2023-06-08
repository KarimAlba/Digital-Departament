import { useState } from 'react';
import styles from './styles.module.scss'

interface UserProffessionModal{
    handleCareerChange: Function;
}

const UserProffessionModal = (props: UserProffessionModal) => {
    const { handleCareerChange } = props;
    const [selectedCareer, setSelectedCareer] = useState<string>('');

    const setUniversity = () => {
        setSelectedCareer('ВУЗ');
        setIsOpen(false);
        handleCareerChange('ВУЗ');
    }

    const setWork = () => {
        setSelectedCareer('Предприятие');
        setIsOpen(false);
        handleCareerChange('Предприятие');
    }

    const setOther = () => {
        setIsOpen(false);
        setIsOpenOther(true);
    }

    const getResultOfOther = (e: any) => {
        setSelectedCareer(e.target.value);
        handleCareerChange(e.target.value);
    }

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isOpenOther, setIsOpenOther] = useState<boolean>(false);

    const handleBlurOther = (e: any) => {
        if (!e.target.value) {
            setIsOpen(false);
            setIsOpenOther(false);
        }
    }

    return (
        <div>
            {
                isOpenOther? 
                <input 
                    type="text" placeholder='Другое' 
                    onInput={(e: any) => getResultOfOther(e)}
                    onBlur={(e: any) => handleBlurOther(e)}
                />:
                isOpen? 
                <div>
                    <input 
                        type="text" defaultValue={selectedCareer}
                    />
                    <ul className={styles.list}>
                        <li onClick={() => setUniversity()}>ВУЗ</li>
                        <li onClick={() => setWork()}>Предприятие</li>
                        <li onClick={() => setOther()}>Другое</li>
                    </ul>
                </div>:
                <input 
                    type="text" placeholder='Род деятельности'
                    defaultValue={selectedCareer? selectedCareer: ''} 
                    onClick={() => setIsOpen(true)}
                />
            }
        </div>
    )
}

export default UserProffessionModal;