import styles from './style.module.scss';
import { useEffect, useState } from 'react';

interface MistakeModalPropsTypes{
    phrase: string;
}

const MistakeModal = (props: MistakeModalPropsTypes) => {
    const { phrase } = props;
    const [isOpen, setIsOpen] = useState<boolean>(true);

    const closeModal = () => {
        setTimeout(() => {
            setIsOpen(false);
        }, 2000);
    }

    useEffect(() => {
        closeModal();
    }, []);

    return (
        isOpen
            ? <div className={styles.modal}>
                <h2>{`Ошибка в ${phrase}`}</h2>
            </div>
            : null
    )
}

export default MistakeModal;
