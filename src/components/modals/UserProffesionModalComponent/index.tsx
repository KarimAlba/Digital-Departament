import { useEffect, useState } from 'react';
import styles from './styles.module.scss'

interface UserProffessionModal{
    handleProffesionChange: Function;
}

const UserProffessionModal = (props: UserProffessionModal) => {
    const { handleProffesionChange } = props;
    const [selectedProf, setSelectedProf] = useState<string>('ВУЗ');
    const setUniversity = () => {setSelectedProf('ВУЗ')}
    const setWork = () => {setSelectedProf('Предприятие')}
    const setOther = () => {setSelectedProf('Другое')}

    const getResultOfProffessionSelect = () => {
        handleProffesionChange(selectedProf);
    }

    useEffect(() => {
        getResultOfProffessionSelect();
    },
    []);

    const [isOpen, setIsOpen] = useState<boolean>(true);

    return (
        <div>
            {isOpen? 
                <input 
                    type="text" placeholder='Род деятельности' 
                    onFocus={() => setIsOpen(false)}
                />:
                <ul onBlur={() => setIsOpen(true)} className={styles.list}>
                    <li onClick={setUniversity}>ВУЗ</li>
                    <li onClick={setWork}>Предприятие</li>
                    <li onClick={setOther}>Другое</li>
                </ul>
            }
        </div>
    )
}

export default UserProffessionModal;