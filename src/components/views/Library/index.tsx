import styles from './style.module.scss';
import Select from '../../ui/Selector';
import { useState, useEffect } from 'react';
import IServerBook from '../../../models/response/IServerBook';
import PublicationAPI from '../../../api/PublicationsAPI';
import ClosedBook from '../ClosedBook';
import Pagination from '../../ui/Pagination';

const Library = () => {
    const [books, setBooks] = useState<IServerBook[] | []>([]);
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize]= useState<number>(7);
    const [isOpenSorting, setIsOpenSorting] = useState<boolean>(false);
    const [authors, setAuthors] = useState<string[]>([]);
    const [subjects, setSubjects] = useState<string[]>([]);

    const [pagBtnsSize, setPagBtnsSize] = useState<number>(0);

    const getTypeResult = () => {
        console.log('type');
    }
    
    const sendReq = (curPage: number) => {
        PublicationAPI.getAllPublications({page: curPage, pageSize: pageSize})
            .then(response => {
                if (response.status <= 204) {
                    console.log(response);
                    const maxPageSize = Math.floor(response.data.totalCount / 4);
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
                    console.log(response.data);
                    if (response.data) {
                        const newAuthors = response.data.map((item: {id: number, name: string}) => String(item.name));
                        console.log(newAuthors);
                        setAuthors(newAuthors);
                    }
                }
            })
            .catch(error => console.log(error));
    };

    const getSubjects = (name?: string) => {
        PublicationAPI.getSubjects(name)
            .then(response => {
                if (response.status <= 204) {
                    console.log(response.data);
                    if (response.data) {
                        const newSubjects = response.data.map((item: {id: number, name: string}) => String(item.name));
                        console.log(newSubjects);
                        setSubjects(newSubjects);
                    }
                }
            })
            .catch(error => console.log(error));
    }

    const getPage = (curPage: number) => {
        setPage(curPage);
        sendReq(curPage);
    };

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
                        getResult={getTypeResult} variation={["Альбом", "Атлас", "Книга", "Справочник"]} 
                        multiple={false} defaultValue='Тип' isImg={true}
                    />
                </div>
                <div className={styles.select}>
                    <Select 
                        getResult={getTypeResult} variation={authors} 
                        multiple={true} defaultValue='Автор' isImg={true} placeholderVal='Выбранные авторы'
                    />
                </div>
                <div className={styles.select}>
                    <Select 
                        getResult={getTypeResult} variation={subjects} 
                        multiple={true} defaultValue='Предмет' isImg={true} placeholderVal='Выбранные предметы'
                    />
                </div>

                <div className={styles.sorting}>
                    <button 
                        className={styles['sorting_btn']} 
                        onClick={() => setIsOpenSorting(!isOpenSorting)}
                        onBlur={() => setIsOpenSorting(!isOpenSorting)}
                    >
                    </button>
                    {isOpenSorting
                        ? (<div className={styles['sorting_modal']}>
                            <button onClick={() => setIsOpenSorting(!isOpenSorting)}>По алфавиту</button>
                            <button onClick={() => setIsOpenSorting(!isOpenSorting)}>По дате публикации</button>
                        </div>)
                        : null
                    }
                </div>
            </div>

            <div className={styles['library_books']}>
                {books.map(book => <ClosedBook book={book} key={book.coverPath + book.filePath}/>)}
            </div>

            <Pagination size={pagBtnsSize} getPage={getPage}/>
            
        </div>
    )
}

export default Library;
