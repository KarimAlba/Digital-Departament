import styles from './style.module.scss';
import IServerBook from '../../../models/responses/IServerBookResponse';
import { useEffect, useState } from 'react';
import DefaultImg from '../../../assets/images/icons/default-book-icon.svg';
import PreferIcon from '../../../assets/images/icons/prefer-icon.svg';
import NotPreferIcon from '../../../assets/images/icons/not-prefer-icon.svg';
import PublicationAPI from '../../../api/PublicationsAPI';
import OpenedBook from '../OpenedBook';
import axiosConfig from '../../../api/axiosConfig';
import { Route, Routes, useNavigate } from 'react-router-dom';

interface ClosedBookPropsTypes{
    book: IServerBook;
}

const ClosedBook = (props: ClosedBookPropsTypes) => {
    const { book } = props;
    const navigate = useNavigate();

    const [favourite, setFavourite] = useState<boolean>(book.isFavourite);

    const handleFavouriteClick = () => {
        setFavourite(!favourite);
        const copy = Object.assign({}, book);
        copy.isFavourite = !favourite;
        PublicationAPI.updateFavourites(copy)
            .then(response => console.log(response))
            .catch(error => console.log(error));
    };

    const handleDivClick = () => {
        navigate(`:${book.id}`);
    }

    console.log(axiosConfig.defaults.baseURL + book.coverPath );

    return(
        <div>
            <div key={book.coverPath + book.id} className={styles.book} onClick={handleDivClick}>
                {favourite
                    ? <img src={PreferIcon} alt="" className={styles.favourite} onClick={handleFavouriteClick}/>
                    : <img src={NotPreferIcon} alt="" className={styles.favourite} onClick={handleFavouriteClick}/>
                }
                <img 
                    src={book.coverPath 
                        ? axiosConfig.defaults.baseURL + book.coverPath 
                        : DefaultImg
                    } 
                    alt="book cover" 
                    key={book.coverPath}
                />
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
        </div>
    )
}

export default ClosedBook;
