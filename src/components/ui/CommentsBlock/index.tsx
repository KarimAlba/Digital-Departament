import styles from './style.module.scss';
import ClientComment from '../ClientComment';
import CommentsAPI from '../../../api/CommentsAPI';
import ICommentResponse from '../../../models/responses/ICommentResponse';
import { useState, useEffect } from 'react';

interface CommentsBlockPropsTypes{
    id: number;
}

const CommentsBlock = (props: CommentsBlockPropsTypes) => {
    const { id } = props;
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(3);
    const [commentVal, setCommentVal] = useState<string>('');
    const [comments, setComments] = useState<ICommentResponse[] | []>([]);

    const getComments = () => {
        CommentsAPI.getCommentaries(page, pageSize, id)
            .then(response => {
                setComments(response.data.data);
            })
            .catch(error => console.log(error));
    }

    const handleTextAreaChange = (e: any) => {
        if (e.target.value) {
            setIsOpen(true);
            setCommentVal(e.target.value);
        } else {
            setIsOpen(false);
        }
    }

    useEffect(() => {
        getComments();
    }, []);

    return (
        <div className={styles.comments}>
            <h2>Комментарии</h2>
            <div className={styles['comments_header']}>
                <label htmlFor="fileInp">
                    <input type="file" name='fileInp'/>    
                </label>
                {isOpen 
                    ? <button className={styles['comments_header_send-btn']}>Отправить</button> 
                    : null
                }
            </div>  
            <textarea name="" id="" placeholder='Введите текст обращения' onInput={handleTextAreaChange}></textarea>
            <div className={styles['comments_container']}>
                {comments.map((item) => <ClientComment key={item.id + item.textComment} comment={item}/>)}
            </div>
        </div>
    );
};

export default CommentsBlock;
