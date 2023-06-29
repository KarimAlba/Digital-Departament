import styles from './style.module.scss';
import PrevImg from '../../../assets/images/icons/to-prev-icon.svg';
import NextImg from '../../../assets/images/icons/to-next-icon.svg'; 
import { useState, useEffect } from 'react';
import { StringDecoder } from 'string_decoder';

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
        };
    };

    const handlePrevClick = () => {
        if (arrayOfBtnText[0] === '1') {
            return
        } else {
            const copy = Object.assign([], arrayOfBtnText);
            const index = copy.findIndex(item => item === '...');
            if (index) {
                const newPart = copy.slice(0, index).map(item => String(+item - 1));
                copy.splice(0, index, newPart[0], newPart[1]);
                console.log('edited'); 
                setArrayOfBtnText(copy);
            } 
        };
    };

    const handleNextClick = () =>  {
        if (arrayOfBtnText[1] === String(pagBtnsSize - 2)) {
            const copy = Object.assign([], arrayOfBtnText);
            const index = copy.findIndex(item => item === '...');
            copy.splice(index, 1);
            setArrayOfBtnText(copy);
            return
        } else {
            const copy = Object.assign([], arrayOfBtnText);
            const index = copy.findIndex(item => item === '...');
            const newPart = copy.slice(0, index).map(item => String(+item + 1));
            copy.splice(0, index, newPart[0], newPart[1]);
            console.log('edited'); 
            setArrayOfBtnText(copy);
        };
    };

    useEffect(() => {
        prepareArray();
    }, [pagBtnsSize]);

    return (
        pagBtnsSize !== 0
            ? (<div className={styles.pagination}>
                <button className={styles['pagination_arrow']} onClick={() => handlePrevClick()}>
                    <img src={PrevImg} alt="arrow" />
                </button>
                {arrayOfBtnText.map((item, index) => 
                    <button key={item} className={String(index + 1) === currentPage ? styles.active : styles.passive} onClick={(e: any) => handleBtnClick(e)}>
                        {item}
                    </button>
                )}
                <button  className={styles['pagination_arrow']} onClick={() => handleNextClick()}>
                    <img src={NextImg} alt="arrow" />
                </button>
            </div> )
            : null
    )
};

export default Pagination;
