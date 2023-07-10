import styles from './style.module.scss';
import { useState, useEffect } from 'react';
import SubjectsAPI from '../../../api/SubjectsAPI';
import { Link } from 'react-router-dom';

interface SubjectsModalPropsTypes{
    setOpenStatus: Function;
}

const SubjectsModal = (props: SubjectsModalPropsTypes) => {
    const { setOpenStatus } = props;

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
                    <li key={subject.id + subject.name}>
                        <Link 
                            to='/main/library'
                            state={{ subjectId: subject.id }}
                            key={subject.id + subject.name}
                            onClick={() => setOpenStatus()}
                        >
                            {subject.name}
                        </Link>
                    </li>
                )}
            </ul>
        </div>
    )
}

export default SubjectsModal;
