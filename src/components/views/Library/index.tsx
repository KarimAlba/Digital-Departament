import styles from './style.module.scss';
import Select from '../Selector';
import { useState, useEffect } from 'react';
import IServerBook from '../../../models/response/IServerBook';
import PublicationAPI from '../../../api/PublicationsAPI';
import DefaultImg from '../../../assets/images/icons/default-book-icon.svg';
import PrevImg from '../../../assets/images/icons/to-prev-icon.svg';
import NextImg from '../../../assets/images/icons/to-next-icon.svg'; 

const Library = () => {
    const [books, setBooks] = useState<IServerBook[] | []>([]);
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize]= useState<number>(7);
    const [isOpenSorting, setIsOpenSorting] = useState<boolean>(false);

    const [pagBtnsSize, setPagBtnsSize] = useState<number>(0);
    const [firstPagBtn, setFirstPagBtn] = useState<number>(1);
    const [activePage, setActivePage] = useState<number>(1);

    const getTypeResult = () => {
        console.log('type');
    }
    
    const sendReq = () => {
        PublicationAPI.getAllPublications({page: page, pageSize: pageSize})
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

    const booksBlock = books.map(book => (
        <div key={book.coverPath + book.id} className={styles.book}>
            <img src={DefaultImg} alt="book img" key={book.coverPath}/>
            <div key={book.creationDate + book.id} className={styles['book_description']}>
                <span key={book.id  + book.coverPath}>
                    {book.authors.map(item => (
                        <span key={book.id + item.name + item.id}>{item.name}</span>
                    ))}
                </span>
                <h6 key={book.title + book.id}>{book.title}</h6>
                <span className={styles['book_description_date']}>
                    {(new Date(book.creationDate)).toLocaleDateString().split('.').at(-1)}
                </span>
            </div>
        </div>
    )) 

    useEffect(() => {
        sendReq();
    }, []);

    return (
        <div className={styles.library}>
            <h3>Вся литература</h3>
            <div className={styles.selectors}>
                <div className={styles.select}>
                    <Select 
                        getResult={getTypeResult} variation={["Альбом", "Атлас", "Книга", "Справочник"]} 
                        multiple={false} defaultValue='Тип'
                    />
                </div>
                <div className={styles.select}>
                    <Select 
                        getResult={getTypeResult} variation={["Альбом", "Атлас", "Книга", "Справочник"]} 
                        multiple={false} defaultValue='Автор'
                    />
                </div>
                <div className={styles.select}>
                    <Select 
                        getResult={getTypeResult} variation={["Альбом", "Атлас", "Книга", "Справочник"]} 
                        multiple={false} defaultValue='Предмет'
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
                            <button>По алфавиту</button>
                            <button>По дате публикации</button>
                        </div>)
                        : null
                    }
                </div>
            </div>

            <div className={styles['library_books']}>
                {booksBlock}
            </div>

            <div className={styles.pagination}>
                <button className={styles['pagination_arrow']}>
                    <img src={PrevImg} alt="arrow" />
                </button>
                <button>
                        {firstPagBtn}
                    </button>
                <button>{firstPagBtn + 1}</button>
                <button>...</button>
                <button>{pagBtnsSize-1}</button>
                <button>{pagBtnsSize}</button>
                <button  className={styles['pagination_arrow']}>
                    <img src={NextImg} alt="arrow" />
                </button>
            </div>
        </div>
    )
}

export default Library;
