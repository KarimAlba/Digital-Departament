import styles from './styles.module.scss';
import BookImg from '../../../assets/images/icons/default-book-icon.svg';
import PublicationAPI from '../../../api/PublicationsAPI';
import IServerBookResponse from '../../../models/responses/IServerBookResponse';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CommentsBlock from '../../ui/CommentsBlock';
import PreferImg from '../../../assets/images/icons/prefer-icon.svg';
import NotPreferImg from '../../../assets/images/icons/not-prefer-icon.svg';
import axiosConfig from '../../../api/axiosConfig';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

const OpenedBook = (props: any) => {
    const [book, setBook] = useState<IServerBookResponse>();
    const [favorite, setFavorite] = useState<boolean>(false);
    const [isReader, setIsReader] = useState<boolean>(false);
    
    const { id } = useParams();

    const sendReq = () => {
        if (id) {
            PublicationAPI.getUniqPublication(Number(id.split(':')[1]))
            .then(response => {
                const data = (response.data as IServerBookResponse);
                setBook(data);
                setFavorite(data.isFavourite);
            })
            .catch(error => console.log(error));
        };
    };

    const handleImgClick = () => {
        setFavorite(!favorite)
    }

    const handleReadClick = () => {
        setIsReader(!isReader);
    }

    const checkCoverPath = () => {
        if (book !== undefined) {
            if (book.coverPath && book.coverPath !== 'null') {
                return `${axiosConfig.defaults.baseURL}/download/${book.coverPath}/${book.title}`;
            }
        } return BookImg;
    }

    useEffect(() => {
        sendReq();
    }, []);

    return (
        <div>
            {book !== undefined
                ? (<div className={styles.book}>
                        <div className={styles['book_container']}>
                            <img src={checkCoverPath()} alt="book cover" className={styles['book_img']}/>
                            <div className={styles.reader}>
                                <button>
                                    <a 
                                        href={`${axiosConfig.defaults.baseURL}/download/${book.filePath}/${book.title}`} 
                                        download
                                    >
                                        Скачать
                                    </a>
                                </button>
                                <button onClick={handleReadClick}>                                
                                    {isReader
                                        ? "Закрыть"
                                        : "Читать"
                                    }
                                </button>
                            </div>
                        </div>

                        {favorite
                            ?  <img src={PreferImg} alt="" onClick={handleImgClick} className={styles['favor-img']}/>
                            :  <img src={NotPreferImg} alt="" onClick={handleImgClick} className={styles['favor-img']}/>
                        }
                        

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
                                                key={item.name + item.id} className={styles.subject}
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
                                            <a href="" key={item.name + item.id}>
                                                {book.tags[book.tags.length - 1].id !== item.id
                                                    ? `#${item.name},`
                                                    : `#${item.name}`
                                                }
                                            </a>   
                                        ))
                                        : null
                                    }
                                </div>
                            </div>
                        </div>
                </div>)
                : null
            }
            {isReader && book !== undefined
                ? (<Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                    <div 
                        style={{
                            margin: '20px 0 20px 15%',
                            width: '70%',
                            height: '600px',
                            border: '1px solid rgba(0, 0, 0, 0.3)',
                        }}
                    >
                        <Viewer fileUrl={`${axiosConfig.defaults.baseURL}/download/${book.filePath}/${book.title}`} />
                    </div>
                </Worker>) 
                : null
            }
            <CommentsBlock id={id ? Number(id.split(':')[1]) : 1}/>
        </div>
    )
};

export default OpenedBook;
