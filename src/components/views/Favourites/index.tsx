import styles from './style.module.scss';

interface FavouritesPropsTypes{

}

const Favourites = (props: FavouritesPropsTypes) => {
    return (
        <div className={styles.favourites}>
            <h3>Избранное</h3>
        </div>
    )
}

export default Favourites;
