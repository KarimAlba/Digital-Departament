import styles from './style.module.scss';
import { useState, useEffect } from 'react';
import SubjectsAPI from '../../../api/SubjectsAPI';

const SubjectsModal = () => {
    const [subjects, setSubjects] = useState<{id: number, name: string}[]>([]);

    const sendReq = () => {
        SubjectsAPI.getSubjects()
            .then(response => {
                setSubjects(response.data);
                console.log(response.data);
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        sendReq();
    }, []);

    return (
        <div className={styles.subjects}>
            <ul>
                {subjects.map(subject => 
                    <li key={subject.id + subject.name}>{subject.name}</li>
                )}
            </ul>
        </div>
    )
}

export default SubjectsModal;
