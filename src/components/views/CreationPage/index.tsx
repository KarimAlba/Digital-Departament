import styles from './style.module.scss';
import { useEffect, useState } from 'react';
import Select from '../../ui/Selector';
import ObjectSelector from '../../ui/ObjectSelector';
import PublicationAPI from '../../../api/PublicationsAPI';
import SubjectsAPI from '../../../api/SubjectsAPI';
import MistakeModal from '../../modals/MistakeModal';
import TagsAPI from '../../../api/TagsAPI';
import moment from 'moment';
import EnumTypePublication from '../../../models/requests/EnumTypePublicationRequest';

const CreationPage = (props: any) => {
    const [bookType, setBookType] = useState<string>('');
    const [bookTitle, setBookTitle] = useState<string>('');
    const [bookAuthors, setBookAuthors] = useState<any[]>([]);
    const [bookCover, setBookCover] = useState<any>();
    const [bookFile, setBookFile] = useState<any>();
    const [bookReleaseDate, setBookReleaseDate] = useState<string>('');
    const [bookTags, setBookTags] = useState<any[]>([]);
    const [bookSubjects, setBookSubjects] = useState<any[]>([]);
    const [bookReview, setBookReview] = useState<string>('');

    const [mistakesArr, setMistakesArr] = useState<string[]>([]);
    const [authorVariation, setAuthorVariation] = useState<{id: number, name: string}[]>([]);
    const [subjectVariation, setSubjectVariation] = useState<{id: number, name: string}[]>([]);
    const [tagVariation, setTagVariation] = useState<{id: number, name: string}[]>([]);
    const [isOpenMistakes, setIsOpenMistakes] = useState<boolean>(false);

    const handleTypeSelect = (val: string) => {
        let type: string = '0';

        switch (val) {
            case "Книга":
                type = String(1);
                break;
            case "Статья": 
                type = String(2);
                break;
            case "Альбом": 
                type = String(3);
                break;
            case "Атлас": 
                type = String(4);
                break;
            case "Руководство": 
                type = String(5);
                break;
            case "Справочник": 
                type = String(6);
                break;
            case "Пособие": 
                type = String(7);
                break;  
            default:
                break;
        }        
        setBookType(type);
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBookTitle(e.target.value);
    };

    const handleAuthorSelect = (val: {id: number, name: string}[]) => {
        const mappedArr = val.map((item) => ({id: item.id, value: item.name})); 
        setBookAuthors(mappedArr);
    };

    const handleReleaseDateChange = (val: string) => {
        setBookReleaseDate(val);
    };

    const handleTagSelect = (val: {id: number, name: string}[]) => {
        const mappedArr = val.map((item) => ({id: item.id, value: item.name}));
        setBookTags(mappedArr);
    };

    const handleSubjectSelect = (val: {id: number, name: string}[]) => {
        const mappedArr = val.map((item) => ({id: item.id, value: item.name}));
        setBookSubjects(mappedArr);
    };

    const handleReviewChange = (e: any) => {
        setBookReview(e.target.value);
    };

    const handleCoverChange = (val: any) => {
        setBookCover(val);
    };

    const handleFileChange = (val: any) => {
        setBookFile(val);
    };

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
    };

    const getTags = (name?: string) => {
        TagsAPI.getTags(name)
            .then(response => {
                if (response.status <= 204) {
                    if (response.data) {
                        setTagVariation(response.data);
                    }
                }
            })
            .catch(error => console.log(error));
    };

    const checkReady = () => {
        const mistakes = [];
        if(!bookType) {
            mistakes.push('Укажите тип книги');
        }

        if (!bookTitle) {
            mistakes.push('Введите название книги');
        }

        if (bookAuthors.length === 0) {
            mistakes.push('Укажите автора/ов книги');
        }

        if (!bookFile) {
            mistakes.push('Прикрепите файл книги');
        }

        if (!bookReleaseDate) {
            mistakes.push('Укажите год выпуска');
        }

        if (bookTags.length === 0) {
            mistakes.push('Введите тэги');
        }

        if (bookSubjects.length === 0) {
            mistakes.push('Введите предметы');
        }

        if (!bookReview) {
            mistakes.push('Опишите книгу');
        }

        if(mistakes.length > 0) {
            setMistakesArr(mistakes);
            setIsOpenMistakes(true);
            setTimeout(() => {
                setIsOpenMistakes(false);
            }, 3000);
            return 0;
        } else {
            setIsOpenMistakes(false);
            return 1;
        }
    }

    const prepareFormData = () => {
        const formData = new FormData();
        formData.append('type', bookType);
        formData.append('title', bookTitle);

        bookAuthors.forEach((author, index) => {
            Object.keys(author).forEach((key) => {
                formData.append(`authors[${index}][${key === 'value' ? 'name': key}]`, (author as any)[key])                
            });
        });

        formData.append('file', bookFile);

        if (bookCover) {
            formData.append('cover', bookCover);
        }

        formData.append('releaseDate', 
            moment(bookReleaseDate)
            .format('YYYY-MM-DD') + 'T12:00:00'
        );

        bookTags.forEach((tag, index) => {
            Object.keys(tag).forEach((key) => {
                formData.append(`tags[${index}][${key === 'value' ? 'name': key}]`, (tag as any)[key])                
            });
        });

        bookSubjects.forEach((subject, index) => {
            Object.keys(subject).forEach((key) => {
                formData.append(`subjects[${index}][${key === 'value' ? 'name': key}]`, (subject as any)[key])                
            });
        });

        formData.append('review', bookReview);

        return formData;
    };

    const sendReq = () => {
        const formData = prepareFormData();
        PublicationAPI.createPublication(formData)
            .then(response => {
                console.log(response);
            })
            .catch(error => console.log(error));
    };

    const handleSendBtnClick = (e:any) => {
        e.preventDefault();

        if (checkReady()) {
            sendReq();
        } else {
            return;
        }
    };

    useEffect(() => {
        getAuthors();
        getSubjects();
        getTags();
    }, []);

    return (
        <form id='formData'>
            {isOpenMistakes? <MistakeModal phraseArr={mistakesArr}/> : null}
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
                    <input type="text" onInput={(e: any) => handleReleaseDateChange(e.target.value)}/>

                    <div className={styles.file}>
                        <span>Прикрепить файл</span>
                        <label htmlFor="fileInp">
                            <input 
                                type="file" 
                                name='fileInp' 
                                accept="application/pdf"
                                onInput={(e: any) => handleFileChange(e.target.value)}
                            />    
                        </label>
                    </div>
                    <div className={styles.cover}>
                        <span>Обложка</span>
                        <label htmlFor="fileInp">
                            <input 
                                type="file" 
                                name='fileInp' 
                                accept="image/png, image/jpg, image/jpeg" 
                                onInput={(e: any) => handleCoverChange(e.target.value)}
                            />    
                        </label>
                    </div>
                </div>

                <div className = {styles['columns_column']}>
                    <h3>Тэги</h3>
                    <ObjectSelector 
                        setResult={handleTagSelect} 
                        variation={tagVariation} 
                        multiple={true} 
                        defaultValue='#...' 
                        isImg={true} 
                        placeholderVal='Выбранные тэги'
                        isOther={true}
                        isTags={true}
                    />

                    <h3 className={styles['special-h3']}>Предметы</h3>
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

            <button 
                className={styles['send-btn']} 
                onClick={(e:any) => handleSendBtnClick(e)}
            >
                Отправить на рассмотрение    
            </button>
        </form>            
    );
};

export default CreationPage;
