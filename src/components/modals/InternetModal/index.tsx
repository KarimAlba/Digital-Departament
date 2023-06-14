import axios from "axios";
import styles from './style.module.scss';
import { useState, useEffect } from 'react';

interface InternetModalPropsTypes{
    getInternet: Function;
}

const InternetModal = (props: InternetModalPropsTypes) => {
    const { getInternet } = props;
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const checkInternetConnection = () => {
        axios.get('https://jsonplaceholder.typicode.com/todos/1')
            .then(response => {
                setIsOpen(false);
                getInternet(true);
            })
            .catch(error => {
                setIsOpen(true);
                getInternet(false);
            })
    }

    useEffect(() => {
        setInterval(() => {
            checkInternetConnection();
        }, 5000);
    }, []);

    return( 
        isOpen
            ? <div className={styles.internet}>
                <h3>Проверьте подключение к интернету...</h3>
            </div>
            : null
    )
}

export default InternetModal;
