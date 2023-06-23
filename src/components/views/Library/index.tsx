import styles from './style.module.scss';
import Select from '../Selector';
import { useState, useEffect } from 'react';
import IServerBook from '../../../models/response/IServerBook';
import PublicationAPI from '../../../api/PublicationsAPI';

const Library = () => {
    const [books, setBooks] = useState<IServerBook[] | []>([]);
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize]= useState<number>(10);

    const getTypeResult = () => {
        console.log('type');
    }
    
    const sendReq = () => {
        PublicationAPI.getAllPublications({page: page, pageSize: pageSize})
            .then(response => {
                if (response.status <= 204) {
                    console.log(response);
                    setBooks(response.data.data);
                }
            })
            .catch(error => console.log(error))
    }

    const booksBlock = books.map(book => (
        <div key={book.coverPath + book.id}>
            <img src={book.coverPath} alt="" key={book.coverPath}/>
            <div key={book.creationDate + book.id}>
                <span key={book.id  + book.coverPath}>
                    {book.authors.map(item => (
                        <span key={book.id + item.name + item.id}>{item.name}</span>
                    ))}
                </span>
                <h6 key={book.title + book.id}>{book.title}</h6>
                <span>{(new Date(book.creationDate)).toLocaleDateString().split('.').at(-1)}</span>
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
            </div>

            <div className={styles['library_books']}>
                {booksBlock}
            </div>
        </div>
    )
}

export default Library;
