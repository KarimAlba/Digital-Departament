import { useState } from 'react';
import styles from './style.module.scss'
import { Link } from 'react-router-dom';
import UserDataModal from '../modals/UserDataModalComponent';
import IUser from '../../models/IUser';
import IBook from '../../models/IBook';

const Main = (props: any) => {
    const [userData, setUserData] = useState<boolean>(false);
    const handleFaceClick = () => {setUserData(!userData)};

    const exampleUser: IUser = {
        login: 'karim_skiy',
        password: '111',
        email: 'karim_skiy@mail.ru',
        name: 'Карим Фаткуллин',
    }

    const exampleBook: IBook = {
        name: "Теория ракетных двигателей",
        author: "Алемасов В.И., Дрегалин А.Ф., Тишин А.П.",
        prefer: true,
        date: '1964'
    } 

    const popularBooks: IBook[] = [exampleBook];

    const authorPrepairing = (arr: string) =>{
        if(arr.length > 14) {
            const newAuthors = arr.slice(0, 11);
            const result = newAuthors + '...'
            return result;
        } else {
            return arr;
        }
    }

    const popularBooksBlock = popularBooks.map(book => (
        <div className={styles.book} key={book.name + book.author}>
            <div 
                className={styles['book_card-img']}
                key={book.name}
            ></div>
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

    return (
        <div className={styles['main-container']}>
            <div className={styles['main-container_head']}>
                <header>
                    <div className={styles.logo}></div>
                    <input type="text" className={styles.search}/>
                    <div className={styles.book}></div>
                    <div className={styles.star}></div>
                    <div className={styles.face} onClick={handleFaceClick}></div>
                </header>
                <nav>
                    <Link to='/'>Вся литература</Link>
                    <Link to='/'>Предметы</Link>
                    <Link to='/'>Тэги</Link>
                    <Link to='/'>Правообладателям</Link>
                </nav>
            </div>
            <div className={styles['user-library']}>
                {userData? 
                    <UserDataModal handleFaceClick={handleFaceClick} exampleUser={exampleUser}/> 
                    : null
                }
                <div className={styles['popular-container']}>
                    <h2>Популярное</h2>
                    <div className={styles.books}>
                        {popularBooksBlock}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main;