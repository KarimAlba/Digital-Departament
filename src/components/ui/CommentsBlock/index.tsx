import styles from './style.module.scss';
import ClientComment from '../ClientComment';
import CommentsAPI from '../../../api/CommentsAPI';
import ICommentResponse from '../../../models/responses/ICommentResponse';
import { useState, useEffect } from 'react';
import ITokenCommentResponse from '../../../models/responses/ITokenCommentResponse';

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
    const [commentFile, setCommentFile] = useState<any>();
    const [commentAssets, setCommentAssets] = useState<any[] | []>([])

    const getComments = () => {
        CommentsAPI.getCommentaries(page, pageSize, id)
            .then(response => {
                const data = (response.data as ITokenCommentResponse);
                setComments(data.data);
            })
            .catch(error => console.log(error));
    }

    const handleFileAdding = (e: any) => {
        const file = e.target.value;
        setCommentFile(file);
        const copy = [...commentAssets];
        copy.push(file);
        setCommentAssets(copy);
    }

    const prepareFormData = () => {
        const formData = new FormData();
        formData.append('publicationId', String(id));
        formData.append('text', commentVal);
        
        commentAssets.forEach((asset, index) => {
            Object.keys(asset).forEach((key) => {
                formData.append(`assets[${index}][${key === 'value' ? 'name': key}]`, (asset as any)[key])                
            });
        });

        return formData;
    }

    const sendComment = () => {
        const formData = prepareFormData();
        CommentsAPI.setComment(formData)
            .then(response => {
                console.log(response);
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

    const handleSendBtnClick = () => {
        sendComment();
    }

    useEffect(() => {
        getComments();
    }, []);

    return (
        <div className={styles.comments}>
            <h2>Комментарии</h2>
            <div className={styles['comments_header']}>
                <label htmlFor="fileInp">
                    <input type="file" name='fileInp' onInput={(e:any) => handleFileAdding(e)}/>    
                </label>
                {commentAssets.length > 0
                    ? <ul style={{margin: 0}}>
                        {commentAssets.map((com, index) => 
                            <li 
                                style={{fontSize: '10px'}}
                                key={com + String(index)}
                            >
                                {com}
                            </li>
                        )}
                    </ul>
                    : null
                }
            </div>  
            <textarea 
                placeholder='Введите текст обращения' 
                onInput={handleTextAreaChange}
            >
            </textarea>
            {isOpen 
                    ? (<button 
                        onClick={handleSendBtnClick}
                        className={styles['comments_header_send-btn']}
                    >
                        Отправить
                    </button> )
                    : null
                }
            <div className={styles['comments_container']}>
                {comments.map((item) => <ClientComment key={item.id + item.textComment} comment={item}/>)}
            </div>
        </div>
    );
};

export default CommentsBlock;
