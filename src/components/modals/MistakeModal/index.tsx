import styles from './style.module.scss';
import { useEffect, useState } from 'react';

interface MistakeModalPropsTypes{
    phraseArr: string[];
}

const MistakeModal = (props: MistakeModalPropsTypes) => {
    const { phraseArr } = props;
    const [isOpen, setIsOpen] = useState<boolean>(true);

    const closeModal = () => {
        setTimeout(() => {
            setIsOpen(false);
        }, 3000);
    }

    const messages = phraseArr.map(item => (
        <p key={item + String(new Date())}>{item}</p>
    ))

    useEffect(() => {
        closeModal();
    }, []);

    return (
        isOpen
            ? <div className={styles.modal}>
                <h2>Проверьте правильность заполнения формы</h2>
                {messages}
            </div>
            : null
    )
}

export default MistakeModal;
