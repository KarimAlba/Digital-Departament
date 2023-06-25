import styles from './style.module.scss';
import PrevImg from '../../../assets/images/icons/to-prev-icon.svg';
import NextImg from '../../../assets/images/icons/to-next-icon.svg'; 
import { useState, useEffect, ReactElement } from 'react';

interface PaginationPropsTypes{
    size: number;
    getPage: Function;
};

const Pagination = (props: PaginationPropsTypes) => {
    const { size, getPage } = props;

    const [pagBtnsSize, setPagBtnsSize] = useState<number>(6);
    const [arrayOfBtnText, setArrayOfBtnText] = useState<string[]>([]); 
    const [currentPage, setCurrentPage] = useState<string>();

    const prepareArray = () => {
        const copy = Object.assign([], arrayOfBtnText);
        for (let i = 1; i <= pagBtnsSize; i++) {
            copy.push(String(i));
        };

        if (copy.length > 4) {
            copy.splice(2, copy.length-4, '...');
            console.log(copy);
        };

        setArrayOfBtnText(copy);
    };

    const handleBtnClick = (e: any) => {
        if (e.target.textContent !== currentPage) {
            setCurrentPage(e.target.textContent);
            getPage(Number(e.target.textContent));
        }
    }

    const btns = arrayOfBtnText.map(item => 
        <button key={item} className={styles.passive} onClick={(e: any) => handleBtnClick(e)}>{item}</button>
    )

    useEffect(() => {
        prepareArray();
    }, [pagBtnsSize]);

    return (
        pagBtnsSize !== 0
            ? (<div className={styles.pagination}>
                <button className={styles['pagination_arrow']}>
                    <img src={PrevImg} alt="arrow" />
                </button>
                {btns}
                <button  className={styles['pagination_arrow']}>
                    <img src={NextImg} alt="arrow" />
                </button>
            </div> )
            : null
    )
}

export default Pagination;
