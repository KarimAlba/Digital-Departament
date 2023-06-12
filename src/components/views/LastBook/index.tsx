import styles from './styles.module.scss';
import IBook from '../../../models/IBook';
import BookImg from '../../../assets/images/icons/default-book-icon.svg';

const LastBook = (props: any) => {
    const exampleBook1: IBook = {
        name: "Теория ракетных двигателей",
        author: "Алемасов В.И., Дрегалин А.Ф., Тишин А.П.",
        prefer: false,
        date: '1964',
        description: 'Изложены теория и расчет ракетных двигателей, работающих на различных видах химического топлива. Рассмотрены характеристики, регулирование и устойчивость процессов таких двигателей.',
        subjects: ['Внутренняя балистика', 'Гидроаэродинамика'],
        tags: [{tag: 'теория'}, {tag: 'база'}, {tag: 'курс'}, {tag: 'теория'}, {tag: 'база'}, {tag: 'курс'}]
    } 

    return (
        <div className={styles.book}>
            <div className={styles['book_container']}>
                <img src={BookImg} alt="" className={styles['book_img']}/>
                <div className={styles.reader}>
                    <button>Скачать</button>
                    <button>Читать</button>
                </div>
            </div>
            <div className={styles['book_description']}>
                <div className={styles['book_description_body']}>
                    <h2>{exampleBook1.name}</h2>
                    <span className={styles['book_date']}>{exampleBook1.date + 'г.'}</span>
                    <h4>{'Авторы: ' + exampleBook1.author}</h4>
                    <p>{exampleBook1.description}</p>
                </div>
                <div className={styles['book_description_footer']}>
                    <div className={styles.subjects}>
                        {exampleBook1.subjects !== undefined
                            ? exampleBook1.subjects.map(item => (
                                <h6 
                                    key={item + '23'} className={styles.subject}
                                    style={Math.random() > 0.5? {backgroundColor: '#EBC12B'}: {backgroundColor: '#EB372B'}}
                                >
                                    {item}
                                </h6>
                            ))
                            : null
                        }
                    </div>
                    <div style={{display: 'flex'}}>
                        {exampleBook1.tags !== undefined
                            ? exampleBook1.tags.map(item => (
                                <a href="">{'#' + item.tag}</a>   
                            ))
                            : null
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LastBook;