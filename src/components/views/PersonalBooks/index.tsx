import IBook from '../../../models/IBook';
import { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import BookImg from '../../../assets/images/icons/default-book-icon.svg';
import PreferBook from '../../../assets/images/icons/prefer-icon.svg';
import PublicationAPI from '../../../api/PublicationsAPI';
import IServerBook from '../../../models/IServerBook';

const PersonalBooks = (props: any) => {
    const [favouritesBooks, setFavouritesBooks] = useState<IServerBook[] | []>([]);

    const sendReq = () => {
        PublicationAPI.getFavourites(1, 5)
            .then(response => console.log(response))
            .catch(error => console.log(error))
    };

    const exampleBook1: IBook = {
        name: "Теория ракетных двигателей",
        author: "Алемасов В.И., Дрегалин А.Ф., Тишин А.П.",
        prefer: false,
        date: '1964'
    } 

    const exampleBook2: IBook = {
        name: "Недвижимость: экономика, оценка и девелопмент",
        author: "Мурзин А.Д.",
        prefer: true,
        date: '2013'
    } 
     
    const popularBooks: IBook[] = [exampleBook1, exampleBook2];

    const authorPrepairing = (arr: string) =>{
        if(arr.length > 14) {
            const newAuthors = arr.slice(0, 11);
            const result = newAuthors + '...'
            return result;
        } else {
            return arr;
        }
    }

    useEffect(() => {
        sendReq();
    }, []);

    const popularBooksBlock = popularBooks.map(book => (
        <div className={styles.book} key={book.name + book.author}>
            {book.prefer 
                ? <img 
                    src={PreferBook}
                    className={styles['book_prefer']}
                    key={book.name + 'books prefer'}
                /> 
                : null
            }
            <img
                className={styles['book_card-img']}
                key={book.name} src={BookImg}
            />
            <div 
                className={styles['book_footer']}
                key={book.author}
            >
                <p key={book.author + book.name}>
                    {authorPrepairing(book.author)}
                </p>
                <h4 key={book.name + 'aqa'}>{book.name}</h4>
                <span key={book.name + 'aqa' +book.author}>{book.date}</span>
            </div>
        </div>
    ))

    return(
        <div className={styles['popular-container']}>
            <h2>Популярное</h2>
            <div className={styles.books}>
                {popularBooksBlock}
            </div>
        </div>
    )
}

export default PersonalBooks