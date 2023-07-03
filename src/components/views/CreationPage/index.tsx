import styles from './style.module.scss';
import { useEffect, useState } from 'react';
import Select from '../../ui/Selector';
import ObjectSelector from '../../ui/ObjectSelector';
import PublicationAPI from '../../../api/PublicationsAPI';

const CreationPage = (props: any) => {
    const [authors, setAuthors] = useState<{id: number, name: string}[]>([]);
    const [subjects, setSubjects] = useState<{id: number, name: string}[]>([]);

    const handleTypeSelect = () => {
        console.log('type');
    }

    const handleAuthorSelect = () => {
        console.log('author');
    }

    const handleSubjectSelect = () => {
        console.log('subject');
    }

    const getAuthors = (name?: string) => {
        PublicationAPI.getAuthors(name)
            .then(response => {
                if (response.status <= 204) {
                    if (response.data) {
                        setAuthors(response.data);
                    }
                }
            })
            .catch(error => console.log(error));
    };

    const getSubjects = (name?: string) => {
        PublicationAPI.getSubjects(name)
            .then(response => {
                if (response.status <= 204) {
                    if (response.data) {
                        setSubjects(response.data);
                    }
                }
            })
            .catch(error => console.log(error));
    }


    useEffect(() => {
        getAuthors();
        getSubjects();
    }, []);

    return (
        <div className={styles.creation}>

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
                    <input type="text" name="" id="" />

                    <h3>Автор</h3>
                    <ObjectSelector 
                        setResult={handleAuthorSelect} 
                        variation={authors} 
                        multiple={true} 
                        defaultValue='Автор' 
                        isImg={true} 
                        placeholderVal='Выбранные авторы'
                    />

                    <h3>Год</h3>
                    <input type="text" />

                    <div className={styles.file}>
                        <span>Прикрепить файл</span>
                        <label htmlFor="fileInp">
                            <input type="file" name='fileInp'/>    
                        </label>
                        <button>
                            Написать здесь
                        </button>
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
                        variation={subjects} 
                        multiple={true} 
                        defaultValue='Предметы' 
                        isImg={true} 
                        placeholderVal='Выбранные прелметы'
                    />   

                    <h3>О книге</h3>
                    <textarea name="" id="" cols={30} rows={7}></textarea>   

                    <h3 className={styles.info}>
                        Публикация будет размещена после <br/>
                        одобрения администрацией
                    </h3>              
                </div>
            </div>

            <button className={styles['send-btn']}>
                    Отправить на рассмотрение    
            </button>
        </div>            
    );
};

export default CreationPage;
