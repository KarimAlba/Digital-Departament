import { useEffect, useState } from 'react';
import styles from './styles.module.scss'

interface UserProffessionModal{
    handleProffesionChange: Function;
}

const UserProffessionModal = (props: UserProffessionModal) => {
    const { handleProffesionChange } = props;
    const [selectedProf, setSelectedProf] = useState<string>('');
    const setUniversity = () => {
        setSelectedProf('ВУЗ');
        setIsOpen(false);
    }
    const setWork = () => {
        setSelectedProf('Предприятие');
        setIsOpen(false);
    }
    const setOther = (e: any) => {
        setSelectedProf(e.target.value);
    }

    const getResultOfProffessionSelect = () => {
        handleProffesionChange(selectedProf);
    }

    useEffect(() => {
        getResultOfProffessionSelect();
    },
    []);

    const [isOpen, setIsOpen] = useState<boolean>(false);


    return (
        <div>
            {isOpen? 
                <div>
                    <input 
                        type="text" value={selectedProf}
                    />
                    <ul className={styles.list}>
                        <li onClick={setUniversity}>ВУЗ</li>
                        <li onClick={setWork}>Предприятие</li>
                        <input 
                            type='text' onInput={setOther} placeholder='Другое'
                            onBlur={() => setIsOpen(false)} className={styles['other-input']}
                        />
                    </ul>
                </div>:
                <input 
                    type="text" placeholder='Род деятельности'
                    value={selectedProf? selectedProf: ''} 
                    onClick={() => setIsOpen(true)}
                />
            }
        </div>
    )
}

export default UserProffessionModal;