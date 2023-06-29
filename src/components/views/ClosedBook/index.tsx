import styles from './style.module.scss';
import IServerBook from '../../../models/responses/IServerBookResponse';
import { useState, useEffect } from 'react';
import DefaultImg from '../../../assets/images/icons/default-book-icon.svg';
import PreferIcon from '../../../assets/images/icons/prefer-icon.svg';
import NotPreferIcon from '../../../assets/images/icons/not-prefer-icon.svg';
import PublicationAPI from '../../../api/PublicationsAPI';

interface ClosedBookPropsTypes{
    book: IServerBook;
}

const ClosedBook = (props: ClosedBookPropsTypes) => {
    const { book } = props;

    const [favourite, setFavourite] = useState<boolean>(book.isFavourite);

    const handleFavouriteClick = () => {
        setFavourite(!favourite);
        PublicationAPI.updateFavourites(book)
            .then(response => console.log(response))
            .catch(error => console.log(error));
    };

    return(
        <div key={book.coverPath + book.id} className={styles.book}>
            {favourite
                ? <img src={PreferIcon} alt="" className={styles.favourite} onClick={handleFavouriteClick}/>
                : <img src={NotPreferIcon} alt="" className={styles.favourite} onClick={handleFavouriteClick}/>
            }
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
    )
}

export default ClosedBook;
