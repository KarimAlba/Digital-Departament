import styles from './style.module.scss';
import Select from '../../ui/Selector';
import { useState, useEffect } from 'react';
import IServerBook from '../../../models/responses/IServerBookResponse';
import PublicationAPI from '../../../api/PublicationsAPI';
import ClosedBook from '../ClosedBook';
import Pagination from '../../ui/Pagination';
import IBook from '../../../models/requests/IPublicationRequest';
import EnumTypePublication from '../../../models/requests/EnumTypePublicationRequest';
import ObjectSelector from '../../ui/ObjectSelector';
import SubjectsAPI from '../../../api/SubjectsAPI';
import EnumSortBy from '../../../models/responses/EnumSortByResponse';
import EnumSortOrder from '../../../models/responses/EnumSortOrderResponse';
import ArrowUpImg from '../../../assets/images/icons/arrow-up-icon.png';
import ArrowBottomImg from '../../../assets/images/icons/arrow-bottom-icon.png';

const Library = () => {
    const [books, setBooks] = useState<IServerBook[] | []>([]);
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize]= useState<number>(7);
    const [isOpenSorting, setIsOpenSorting] = useState<boolean>(false);
    const [authors, setAuthors] = useState<{id: number, name: string}[]>([]);
    const [subjects, setSubjects] = useState<{id: number, name: string}[]>([]);
    const [book, setBook] = useState<IBook>({page: 1, pageSize: 7})
    const [pagBtnsSize, setPagBtnsSize] = useState<number>(0);
    const [sortedBy, setSortedBy] = useState<EnumSortBy>(0);
    const [sortedOrder, setSortedOrder] = useState<EnumSortOrder>(0);
    
    const sendReq = (curPage: number) => {
        PublicationAPI.getAllPublications({page: curPage, pageSize: pageSize})
            .then(response => {
                if (response.status <= 204) {
                    const maxPageSize = Math.floor(response.data.totalCount / pageSize);
                    setPagBtnsSize(maxPageSize);
                    setBooks(response.data.data);
                }
            })
            .catch(error => console.log(error))
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

    const sendFiltrationRequest = (bookVal: IBook) => {
        PublicationAPI.getAllPublications(bookVal)
            .then(response => {
                if (response.status <= 204) {
                    console.log(response);
                    const maxPageSize = Math.floor(response.data.totalCount / pageSize);
                    setPagBtnsSize(maxPageSize);
                    setBooks(response.data.data);
                }
            })
            .catch(error => console.log(error));
    };

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

        sendFiltrationRequest(copy);
    }

    const filtration = (param: number, array: {id: number, name: string}[]) => {
        console.log(param);
        const copy = Object.assign({}, book);
        if (param) {
            copy.authors = array.map(item => item.id);
        } else {
            copy.subjects = array.map(item => item.id);
        }

        sendFiltrationRequest(copy);
    }

    const getPage = (curPage: number) => {
        setPage(curPage);
        sendReq(curPage);
    };

    const handleAlphabetBtnClick = () => {
        setIsOpenSorting(!isOpenSorting);
        setSortedBy(0);
        const copy = Object.assign({}, book);
        copy.sortBy = 0;
        sendFiltrationRequest(copy);
    }

    const handleDateOfCreationBtnClick = () => {
        setIsOpenSorting(!isOpenSorting);
        setSortedBy(1);
        const copy = Object.assign({}, book);
        copy.sortBy = 1;
        sendFiltrationRequest(copy);
    }

    const handleArrowUpClick = () => {
        setSortedOrder(1);
        const copy = Object.assign({}, book);
        copy.sortOrder = 1;
        sendFiltrationRequest(copy);
    }

    const handleArrowBottomClick = () => {
        setSortedOrder(0);
        const copy = Object.assign({}, book);
        copy.sortOrder = 0;
        sendFiltrationRequest(copy);
    }

    useEffect(() => {
        sendReq(page);
        getAuthors();
        getSubjects();
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
                    />
                </div>

                <div 
                    className={styles.sorting}
                    onBlur={() => setIsOpenSorting(false)}
                >
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
                                {sortedBy === 0
                                    ? (sortedOrder === 0
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
                                    ? (sortedOrder === 0
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
