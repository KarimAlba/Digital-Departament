import styles from './styles.module.scss';
import ICommentResponse from '../../../models/responses/ICommentResponse';

interface ClientCommentPropsTypes{
    comment: ICommentResponse;
}

const ClientComment = (props: ClientCommentPropsTypes) => {
    const { comment } = props;

    return (
        <div className={styles.comment}>
            <div className={styles['comment_head']}>

                <div  className={styles['author']}>
                    <h2>{comment.author.name.split('')[0]}</h2>
                    <div>
                        <h3>{comment.author.name}</h3>
                        <span>{comment.author.post}</span>
                    </div>
                </div>
                <span className={styles.date}>
                    {(new Date(comment.creationDate)).toLocaleDateString()}
                </span>

            </div>

            <div className={styles['comment_body']}>
                <p>{comment.textComment}</p>
            </div>
        </div>
    )
};

export default ClientComment;
