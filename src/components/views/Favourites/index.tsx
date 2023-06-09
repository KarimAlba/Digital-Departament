import styles from './style.module.scss';
import { useState, useEffect } from 'react';
import PublicationAPI from '../../../api/PublicationsAPI';
import IServerBook from '../../../models/responses/IServerBookResponse';
import ClosedBook from '../../ui/ClosedBook';
import IGotFavourites from '../../../models/responses/IGotFavourites';

const Favourites = () => {
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(7);
    const [contains, setContains] = useState<boolean>(true);
    const [books, setBooks] = useState<IServerBook[]>([]);

    const sendReq = () => {
        PublicationAPI.getFavourites(page, pageSize)
            .then(response => {
                if (response.status <= 204) {
                    const data = (response.data as IGotFavourites)
                    if (data.totalCount === 0) {
                        setContains(false);
                    } else {
                        setContains(true);
                        setBooks(data.data);
                    }
                }
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        sendReq();
    }, []);

    return (
        <div className={styles.container}>
            <h3>Избранное</h3>
            {!contains
                ? <h5>Вы еще пока не добавили в избранное ни одной книги</h5>
                : (<div className={styles.favourites}>
                    {books.map(book => <ClosedBook book={book} key={book.coverPath + book.filePath}/>)}
                </div>)
            }
        </div>
    )
}

export default Favourites;
