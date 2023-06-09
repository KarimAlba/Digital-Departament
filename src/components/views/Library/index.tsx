import styles from './style.module.scss';
import Select from '../../ui/Selector';
import { useState, useEffect } from 'react';
import IServerBook from '../../../models/responses/IServerBookResponse';
import PublicationAPI from '../../../api/PublicationsAPI';
import ClosedBook from '../../ui/ClosedBook';
import Pagination from '../../ui/Pagination';
import IBook from '../../../models/requests/IPublicationRequest';
import EnumTypePublication from '../../../models/enums/EnumTypePublicationRequest';
import ObjectSelector from '../../ui/ObjectSelector';
import SubjectsAPI from '../../../api/SubjectsAPI';
import EnumSortBy from '../../../models/enums/EnumSortByResponse';
import EnumSortOrder from '../../../models/enums/EnumSortOrderResponse';
import ArrowUpImg from '../../../assets/images/icons/arrow-up-icon.png';
import ArrowBottomImg from '../../../assets/images/icons/arrow-bottom-icon.png';
import AuthorsAPI from '../../../api/AuthorsAPI';
import IPublicationTokenResponse from '../../../models/responses/IPublicationsTokenResponse';

interface LibraryPropsTypes {
    bookValue?: IBook;
    subjectVal?: {id: number, name: string}; 
}

const Library = (props: LibraryPropsTypes) => {
    const { bookValue, subjectVal } = props;

    const [books, setBooks] = useState<IServerBook[] | []>([]);
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize]= useState<number>(2);
    const [isOpenSorting, setIsOpenSorting] = useState<boolean>(false);
    const [authors, setAuthors] = useState<{id: number, name: string}[] | []>([]);
    const [subjects, setSubjects] = useState<{id: number, name: string}[] | []>([]);
    const [book, setBook] = useState<IBook>({page: page, pageSize: pageSize});
    const [pagBtnsSize, setPagBtnsSize] = useState<number>(0);
    const [sortedBy, setSortedBy] = useState<EnumSortBy>(EnumSortBy.Alphabet);
    const [sortedOrder, setSortedOrder] = useState<EnumSortOrder>(EnumSortOrder.Increase);
    const [subjectProps, setSubjectProps] = useState<{id: number, name: string}>();

    const sendReq = (bookObj: IBook) => {
        PublicationAPI.getAllPublications({...bookObj})
            .then(response => {
                if (response.status <= 204) {
                    const data = (response.data as IPublicationTokenResponse);
                    const maxPageSize = Math.floor(data.totalCount / pageSize);
                    setPagBtnsSize(maxPageSize);
                    setBooks(data.data);
                }
            })
            .catch(error => console.log(error));
    };

    const getAuthors = (name?: string) => {
        AuthorsAPI.getAuthors(name)
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
        SubjectsAPI.getSubjects(name)
            .then(response => {
                if (response.status <= 204) {
                    if (response.data) {
                        setSubjects(response.data);
                    }
                }
            })
            .catch(error => console.log(error));
    }

    const filterByType = (val: string) => {
        const copy = Object.assign({}, book);
        switch (val) {
            case "Книга":
                copy.type = EnumTypePublication.Книга;
                break;
            case "Статья": 
                copy.type = EnumTypePublication.Статья;
                break;
            case "Альбом": 
                copy.type = EnumTypePublication.Альбом;
                break;
            case "Атлас": 
                copy.type = EnumTypePublication.Атлас;
                break;
            case "Руководство": 
                copy.type = EnumTypePublication.Руководство;
                break;
            case "Справочник": 
                copy.type = EnumTypePublication.Справочник;
                break;
            case "Пособие": 
                copy.type = EnumTypePublication.Пособие;
                break;  
            default:
                break;
        }      
        
        setBook(copy);
        sendReq(copy);
    }

    const filtration = (array: {id: number, name: string}[], param?: number) => {
        const copy = Object.assign({}, book);
        if (param) {
            copy.authors = array.map(item => item.id);
        } else {
            copy.subjects = array.map(item => item.id);
        }

        sendReq(copy);
    }

    const getPage = (curPage: number) => {
        setPage(curPage);
        const copy = Object.assign({}, book);
        copy.page = curPage;
        sendReq(copy);
    };

    const handleAlphabetBtnClick = () => {
        setIsOpenSorting(!isOpenSorting);
        setSortedBy(EnumSortBy.Alphabet);
        const copy = Object.assign({}, book);
        copy.sortBy = EnumSortBy.Alphabet;
        setBook(copy);
        sendReq(copy);
    }

    const handleDateOfCreationBtnClick = () => {
        setIsOpenSorting(!isOpenSorting);
        setSortedBy(EnumSortBy.CreationDate);
        const copy = Object.assign({}, book);
        copy.sortBy = EnumSortBy.CreationDate;
        setBook(copy);
        sendReq(copy);
    }

    const handleArrowUpClick = () => {
        setSortedOrder(EnumSortOrder.Increase);
        const copy = Object.assign({}, book);
        copy.sortOrder = EnumSortOrder.Increase;
        sendReq(copy);
    }

    const handleArrowBottomClick = () => {
        setSortedOrder(EnumSortOrder.Decrease);
        const copy = Object.assign({}, book);
        copy.sortOrder = EnumSortOrder.Decrease;
        sendReq(copy);
    }

    useEffect(() => {
        getAuthors();
        getSubjects();

        if (bookValue !== undefined) {
            setPageSize(bookValue.pageSize);
            setBook(bookValue);
            sendReq(bookValue);
            console.log(1);
            if (subjectVal !== undefined) {
                setSubjectProps(subjectVal);
            }
            return;
        }

        sendReq(book);
    }, []);

    return (
        <div className={styles.library}>
            <h3>Вся литература</h3>
            <div className={styles.selectors}>
                <div className={styles.select}>
                    <Select 
                        setResult={filterByType} 
                        variation={["Книга", "Статья", "Альбом", "Атлас",  "Руководство", "Справочник", "Пособие"]} 
                        multiple={false} 
                        defaultValue='Тип' 
                        isImg={true}
                    />
                </div>
                <div className={styles.select}>
                    <ObjectSelector 
                        setResult={filtration} 
                        variation={authors} 
                        multiple={true} 
                        defaultValue='Автор' 
                        isImg={true} 
                        placeholderVal='Выбранные авторы'
                    />
                </div>
                <div className={styles.select}>
                    <ObjectSelector 
                        setResult={filtration} 
                        variation={subjects} 
                        multiple={true} 
                        defaultValue='Предмет' 
                        isImg={true} 
                        placeholderVal='Выбранные предметы'
                        isSubject={subjectProps}
                    />
                </div>

                <div className={styles.sorting}>
                    <button 
                        className={styles['sorting_btn']} 
                        onClick={() => setIsOpenSorting(!isOpenSorting)}
                    >
                    </button>
                    {isOpenSorting
                        ? (<div className={styles['sorting_modal']}>
                            <div className={styles['sorting-blocks']}>
                                <button 
                                    onClick={handleAlphabetBtnClick}
                                >
                                    По алфавиту
                                </button>
                                {sortedBy === EnumSortBy.Alphabet
                                    ? (sortedOrder === EnumSortOrder.Decrease
                                        ? <img 
                                            src={ArrowUpImg} 
                                            alt="" 
                                            onClick={handleArrowUpClick}
                                        />
                                        : <img 
                                            src={ArrowBottomImg} 
                                            alt=""
                                            onClick={handleArrowBottomClick}
                                        />
                                    )
                                    : null
                                }
                            </div>
                            <div className={styles['sorting-blocks']}>
                                <button 
                                    onClick={handleDateOfCreationBtnClick}
                                >
                                    По дате публикации
                                </button>
                                {sortedBy === 1
                                    ? (sortedOrder === EnumSortOrder.Decrease
                                        ? <img 
                                            src={ArrowUpImg} 
                                            alt="" 
                                            onClick={handleArrowUpClick}
                                        />
                                        : <img 
                                            src={ArrowBottomImg} 
                                            alt=""
                                            onClick={handleArrowBottomClick}
                                        />
                                    )
                                    : null
                                }
                            </div>
                        </div>)
                        : null
                    }
                </div>
            </div>

            <div className={styles['library_books']}>
                {books.map(book => <ClosedBook book={book} key={book.coverPath + book.id}/>)}
            </div>
            <Pagination size={pagBtnsSize} getPage={getPage}/> 
        </div>
    )
}

export default Library;
