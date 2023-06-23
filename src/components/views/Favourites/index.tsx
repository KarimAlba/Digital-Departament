import styles from './style.module.scss';
import { useState, useEffect } from 'react';
import PublicationAPI from '../../../api/PublicationsAPI';

interface FavouritesPropsTypes{

}

const Favourites = (props: FavouritesPropsTypes) => {
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(7);
    const [contains, setContains] = useState<boolean>(true);

    const sendReq = () => {
        PublicationAPI.getFavourites(page, pageSize)
            .then(response => {
                if (response.status <= 204) {
                    console.log(response);
                    if (response.data.totalCount === 0) {
                        setContains(false);
                    } else {
                        setContains(true);
                        console.log(response.data.data);
                    }
                }
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        sendReq();
    }, []);

    return (
        <div className={styles.favourites}>
            <h3>Избранное</h3>
            {!contains
                ? <h5>Вы еще пока не добавили в избранное ни одной книги</h5>
                : (<div className={styles.favourites}>
                    <h3>Вот они родимые</h3>
                </div>)
            }
        </div>
    )
}

export default Favourites;
