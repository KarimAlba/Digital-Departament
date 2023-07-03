import styles from './styles.module.scss';
import BookImg from '../../../assets/images/icons/default-book-icon.svg';
import PublicationAPI from '../../../api/PublicationsAPI';
import IServerBookResponse from '../../../models/responses/IServerBookResponse';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const OpenedBook = (props: any) => {
    const [book, setBook] = useState<IServerBookResponse>();
    
    const { id } = useParams();

    const sendReq = () => {
        if (id) {
            PublicationAPI.getUniqPublication(Number(id.split(':')[1]))
                .then(response => {
                    setBook(response.data);
                })
                .catch(error => console.log(error));
        }
    }

    useEffect(() => {
        sendReq();
        console.log(id);
    }, []);

    return (
        book !== undefined
            ? (<div className={styles.book}>
                    <div className={styles['book_container']}>
                        <img src={BookImg} alt="" className={styles['book_img']}/>
                        <div className={styles.reader}>
                            <button>Скачать</button>
                            <button>Читать</button>
                        </div>
                    </div>
                    <div className={styles['book_description']}>
                        <div className={styles['book_description_body']}>
                            <h2>{book.title}</h2>
                            <span className={styles['book_date']}>{(new Date(book.releaseDate).getFullYear()) + 'г.'}</span>
                            <div className={styles.authors}>
                            <h4>Авторы:</h4>
                                {book.authors.map(author => 
                                    <h4 key={author.name + author.id}>{author.name}</h4>
                                )}
                            </div>
                            <p>{book.review}</p>
                        </div>
                        <div className={styles['book_description_footer']}>
                            <div className={styles.subjects}>
                                {book.subjects !== undefined
                                    ? book.subjects.map(item => (
                                        <h6 
                                            key={item + '23'} className={styles.subject}
                                            style={Math.random() > 0.5? {backgroundColor: '#EBC12B'}: {backgroundColor: '#EB372B'}}
                                        >
                                            {item.name}
                                        </h6>
                                    ))
                                    : null
                                }
                            </div>
                            <div style={{display: 'flex'}}>
                                {book.tags !== undefined
                                    ? book.tags.map(item => (
                                        <a href="">{'#' + item.name}</a>   
                                    ))
                                    : null
                                }
                            </div>
                        </div>
                    </div>
            </div>)
            : null
    )
}

export default OpenedBook;