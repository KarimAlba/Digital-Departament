import styles from './style.module.scss';
import IServerBook from '../../../models/response/IServerBook';
import { useState, useEffect } from 'react';
import DefaultImg from '../../../assets/images/icons/default-book-icon.svg';

interface ClosedBookPropsTypes{
    book: IServerBook;
}

const ClosedBook = (props: ClosedBookPropsTypes) => {
    const { book } = props;
    return(
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
    )
}

export default ClosedBook;
