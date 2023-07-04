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
            setCurrentPage('1');
            getPage('1');
            return;
        } else {
            const copy = Object.assign([], arrayOfBtnText);
            const index = copy.findIndex(item => item === '...');  
            setCurrentPage(String(+currentPage - 1)); 
            getPage(+currentPage - 1);
            if (index === -1) {
                if (currentPage === String(pagBtnsSize - 3)) {
                    const slicedPart = copy.slice(0, 2).map(item => String(+item - 1));
                    copy.splice(0, 2, ...slicedPart, '...');
                    setArrayOfBtnText(copy);
                }
            } else {
                const slicedPart = copy.slice(0, 2).map(item => String(+item - 1));
                copy.splice(0, 2, ...slicedPart);
                setArrayOfBtnText(copy);
            };
        };
    };

    const handleNextClick = () =>  {
        if (Number(currentPage) < pagBtnsSize) {
            const curPage = String(Number(currentPage) + 1);
            setCurrentPage(curPage);
            getPage(+curPage);
            const copy = Object.assign([], arrayOfBtnText);
            const index = copy.findIndex(item => item === '...');

            if (index === -1) {
                return;
            };
            if (Number(arrayOfBtnText[1]) < Number(arrayOfBtnText.at(-2))) {
                const newPart = copy.slice(0, 2).map(item => String(Number(item) + 1));
                console.log(newPart);
                copy.splice(0, 2, ...newPart);

                if (copy[1] === String(Number(copy[copy.length - 2]) - 1)) {
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
        console.log(size);
    }, [size]);

    return (
        pagBtnsSize !== 0
            ? (<div className={styles.pagination}>
                {currentPage === '1'
                    ? null
                    : (<button className={styles['pagination_arrow']} onClick={() => handlePrevClick()}>
                        <img src={PrevImg} alt="arrow" />
                    </button>)
                } 
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
                {currentPage === String(pagBtnsSize) 
                    ? null
                    : (<button className={styles['pagination_arrow']} onClick={() => handleNextClick()}>
                        <img src={NextImg} alt="arrow" />
                    </button>)
                }
            </div> )
            : null
    )
};

export default Pagination;
