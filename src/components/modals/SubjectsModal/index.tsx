import styles from './style.module.scss';
import { useState, useEffect } from 'react';
import SubjectsAPI from '../../../api/SubjectsAPI';
import { useNavigate } from 'react-router-dom';

interface SubjectsModalPropsTypes{
    setOpenStatus: Function;
}

const SubjectsModal = (props: SubjectsModalPropsTypes) => {
    const { setOpenStatus } = props;
    const navigate = useNavigate();
    const [subjects, setSubjects] = useState<{id: number, name: string}[]>([]);

    const sendReq = () => {
        SubjectsAPI.getSubjects()
            .then(response => {
                setSubjects(response.data);
                console.log(response.data);
            })
            .catch(error => console.log(error))
    }

    const handleSubjectClick = (item: {id: number, name: string}) => {
        setOpenStatus(item);
        navigate('/main/welcoming');
        setTimeout(() => {
            navigate('/main/library');
        }, 10);
    }

    useEffect(() => {
        sendReq();
    }, []);

    return (
        <div className={styles.subjects}>
            <ul>
                {subjects.map(subject => 
                    <li 
                        key={subject.id + subject.name} 
                        onClick={() => handleSubjectClick(subject)}
                    >
                        {subject.name}
                    </li>
                )}
            </ul>
        </div>
    )
}

export default SubjectsModal;
