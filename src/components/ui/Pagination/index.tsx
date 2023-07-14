import styles from './style.module.scss';
import PrevImg from '../../../assets/images/icons/to-prev-icon.svg';
import NextImg from '../../../assets/images/icons/to-next-icon.svg'; 
import { useState, useEffect } from 'react';

interface PaginationPropsTypes{
    size: number;
    getPage: Function;
};

const Pagination = (props: PaginationPropsTypes) => {
    const { size, getPage } = props;

    const [pagBtnsSize, setPagBtnsSize] = useState<number>(size);
    const [arrayOfBtnText, setArrayOfBtnText] = useState<string[]>([]); 
    const [currentPage, setCurrentPage] = useState<string>('1');

    const prepareArray = (size: number) => {
        const copy: string[] = [];

        for (let i = 1; i <= size; i++) {
            copy.push(String(i));
        };

        if (copy.length > 6) {
            copy.splice(3, copy.length-6, '...');
        };
        setArrayOfBtnText(copy);
    };

    const handleBtnClick = (e: any) => {
        if (e.target.textContent !== currentPage) {
            setCurrentPage(e.target.textContent);
            getPage(Number(e.target.textContent));
            if (Number(e.target.textContent) > 1 && Number(e.target.textContent) < pagBtnsSize) {
                const copy = Object.assign([], arrayOfBtnText);
                const indexOfPoints = arrayOfBtnText.findIndex(item => item === '...');
                const indexOfCurPage = arrayOfBtnText.findIndex(item => item === e.target.textContent);
                if (indexOfPoints && indexOfCurPage < indexOfPoints) {
                    copy.splice(
                        0, 
                        indexOfPoints, 
                        String(Number(e.target.textContent) - 1), 
                        e.target.textContent, 
                        String(Number(e.target.textContent) + 1)
                    );
                }
                setArrayOfBtnText(copy);
            }
        };
    };

    const handlePrevClick = () => {
        if (arrayOfBtnText[0] === '1') {
            setCurrentPage('1');
            getPage('1');
            return;
        } else {
            const copy = Object.assign([], arrayOfBtnText);
            const index = copy.findIndex(item => item === '...');  
            setCurrentPage(String(+currentPage - 1)); 
            getPage(+currentPage - 1);
            if (index === -1) {
                if (currentPage === String(pagBtnsSize - 4)) {
                    const slicedPart = copy.slice(0, 3).map(item => String(+item - 1));
                    copy.splice(0, 3, ...slicedPart, '...');
                    setArrayOfBtnText(copy);
                }
            } else {
                const slicedPart = copy.slice(0, 3).map(item => String(+item - 1));
                copy.splice(0, 3, ...slicedPart);
                setArrayOfBtnText(copy);
            };
        };
    };

    const handleNextClick = () =>  {
        if(currentPage === '1') {
            const copy = Object.assign([], arrayOfBtnText);
            copy.splice(0, 3, '2', '3', '4');
            setCurrentPage('2');
            getPage(2);
            return; 
        }

        if (Number(currentPage) < pagBtnsSize) {
            const curPage = String(Number(currentPage) + 1);
            setCurrentPage(curPage);
            getPage(+curPage);
            const copy = Object.assign([], arrayOfBtnText);
            const index = copy.findIndex(item => item === '...');

            if (index === -1) {
                return;
            };
            if (Number(arrayOfBtnText[2]) < Number(arrayOfBtnText.at(-3))) {
                const newPart = copy.slice(0, 3).map(item => String(Number(item) + 1));
                copy.splice(0, 3, ...newPart);

                if (copy[2] === String(Number(copy[copy.length - 3]) - 1)) {
                    const index = arrayOfBtnText.findIndex(item => item === '...');
                    copy.splice(index, 1);
                }
            } ;
            setArrayOfBtnText(copy);
        };
    };

    useEffect(() => {
        setPagBtnsSize(size);
        prepareArray(size);
    }, [size]);

    return (
        pagBtnsSize !== 0
            ? (<div className={styles.pagination}>
                <button className={styles['pagination_arrow']} onClick={() => handlePrevClick()}>
                    <img src={PrevImg} alt="arrow" />
                </button>
                {arrayOfBtnText.map((item) => 
                    <button key={item} 
                        className={item === currentPage && item  !== '...' 
                            ? styles.active 
                            : styles.passive
                        } 
                        onClick={(e: any) => handleBtnClick(e)}
                    >
                        {item}
                    </button>
                )}
                <button className={styles['pagination_arrow']} onClick={() => handleNextClick()}>
                    <img src={NextImg} alt="arrow" />
                </button>
            </div> )
            : null
    )
};

export default Pagination;
