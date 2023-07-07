import styles from './style.module.scss';
import { useEffect, useState } from 'react';
import Select from '../../ui/Selector';
import ObjectSelector from '../../ui/ObjectSelector';
import PublicationAPI from '../../../api/PublicationsAPI';
import SubjectsAPI from '../../../api/SubjectsAPI';
import MistakeModal from '../../modals/MistakeModal';

const CreationPage = (props: any) => {
    const [bookType, setBookType] = useState<string>('');
    const [bookTitle, setBookTitle] = useState<string>('');
    const [bookAuthors, setBookAuthors] = useState<{id: number, name: string}[]>([]);
    const [authorVariation, setAuthorVariation] = useState<{id: number, name: string}[]>([]);
    const [subjectVariation, setSubjectVariation] = useState<{id: number, name: string}[]>([]);
    const [bookSubjects, setBookSubjects] = useState<{id: number, name: string}[]>([]);
    const [bookReview, setBookReview] = useState<string>('');

    const handleTypeSelect = (val: string) => {
        setBookType(val);
    }

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBookTitle(e.target.value);
    }

    const handleAuthorSelect = (val: {id: number, name: string}[]) => {
        setBookAuthors(val);
        console.log(val);
    }

    const handleSubjectSelect = (val: {id: number, name: string}[]) => {
        setBookSubjects(val);
    }

    const handleReviewChange = (e: any) => {
        setBookReview(e.target.value);
    }

    const getAuthors = (name?: string) => {
        PublicationAPI.getAuthors(name)
            .then(response => {
                if (response.status <= 204) {
                    if (response.data) {
                        setAuthorVariation(response.data);
                    }
                }
            })
            .catch(error => console.log(error));
    };

    const getSubjects = (name?: string) => {
        SubjectsAPI.getSubjects(name)
            .then(response => {
                if (response.status <= 204) {
                    if (response.data) {
                        setSubjectVariation(response.data);
                    }
                }
            })
            .catch(error => console.log(error));
    }

    // const sendReq = () => {
    //     PublicationAPI.createPublication()
    //         .then(response => console.log(response))
    //         .catch(error => console.log(error));
    // };

    useEffect(() => {
        getAuthors();
        getSubjects();
    }, []);

    useEffect(() => {

    }, []);

    return (
        <form id='formData'>
            <h2>Создание публикации</h2>

            <div className={styles['creation_columns']}>
                <div className={styles['columns_column']}>
                    <h3>Тип</h3>
                    <Select
                        setResult={handleTypeSelect}
                        variation={["Книга", "Статья", "Альбом", "Атлас",  "Руководство", "Справочник", "Пособие"]} 
                        multiple={false} 
                        defaultValue='Тип' 
                        isImg={true}
                    />

                    <h3>Название</h3>
                    <input type="text" name="" id="" onInput={handleTitleChange}/>

                    <h3>Автор</h3>
                    <ObjectSelector 
                        setResult={handleAuthorSelect} 
                        variation={authorVariation} 
                        multiple={true} 
                        defaultValue='Автор' 
                        isImg={true} 
                        placeholderVal='Выбранные авторы'
                        isOther={true}
                    />

                    <h3 className={styles['special-h3']}>Год</h3>
                    <input type="text" />

                    <div className={styles.file}>
                        <span>Прикрепить файл</span>
                        <label htmlFor="fileInp">
                            <input type="file" name='fileInp'/>    
                        </label>
                    </div>
                    <div className={styles.cover}>
                        <span>Обложка</span>
                        <label htmlFor="fileInp">
                            <input type="file" name='fileInp'/>    
                        </label>
                    </div>
                </div>

                <div className = {styles['columns_column']}>
                    <h3>Тэги</h3>
                    <input type="text" placeholder='#...'/>

                    <h3>Предметы</h3>
                    <ObjectSelector 
                        setResult={handleSubjectSelect} 
                        variation={subjectVariation} 
                        multiple={true} 
                        defaultValue='Предметы' 
                        isImg={true} 
                        placeholderVal='Выбранные предметы'
                        isOther={true}
                    />   

                    <h3 className={styles['special-h3']}>О книге</h3>
                    <textarea name="" id="" cols={30} rows={7} onInput={(e: any) => handleReviewChange(e)}></textarea>   

                    <h3 className={styles.info}>
                        Публикация будет размещена после <br/>
                        одобрения администрацией
                    </h3>              
                </div>
            </div>

            <button className={styles['send-btn']}>
                Отправить на рассмотрение    
            </button>
        </form>            
    );
};

export default CreationPage;
