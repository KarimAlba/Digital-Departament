import styles from './style.module.scss';
import { useEffect, useState } from 'react';
import SelectImg from '../../../assets/images/icons/select-icon.svg';

interface SelectPropsTypes{
    variation: string[];
    getResult: Function;
    multiple: boolean;
    defaultValue: string;
    isImg?: boolean;
    placeholderVal?: string;
}

const Select = (props: SelectPropsTypes) => {
    const { variation, multiple, getResult, defaultValue, isImg, placeholderVal } = props;
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [value, setValue] = useState<string>(defaultValue);

    const [multipleValue, setMultipleValue] = useState<string[]>([]);

    const checkItemLength = (element: string) => {
        if (element.length > 13) {
            const slicedElem = element.slice(0, 12);
            const result = slicedElem + '...';
            return result;
        } return element;
    };

    const menu = variation.map(item => 
        <li key={item} onClick={() => handleLiClick(item)}>
            {checkItemLength(item)}
        </li>
    )

    const handleDivClick = () => {
        setIsOpen(!isOpen);
    };

    const handleLiClick = (val: string) => {
        if (multiple) {
            const copy = Object.assign([], multipleValue);
            copy.push(val);
            setMultipleValue(copy);
            setIsOpen(false);
        } else {
            setValue(val);
            setIsOpen(false);
            getResult(val);
        };
    };

    const handleButtonClick = (e: any) => {
        const index = multipleValue.findIndex(item => item === e.target.textContent);
        if (index) {
            const copy = Object.assign([], multipleValue);
            copy.splice(index, 1);
            setMultipleValue(copy);
        } return;
    }; 

    return (
        <div style={{position: 'relative'}}>
            <div className={styles.select} onClick={handleDivClick}>
                {isOpen
                    ? (<ul className={styles.list}>{menu}</ul>)
                    : multiple 
                        ? <div className={styles['multiple-select']}>
                            <p 
                                style={isImg 
                                    ? {background: `url(${SelectImg})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right'} 
                                    : {background: 'none'}
                                }
                            >
                                {multipleValue.length ? placeholderVal: defaultValue } 
                            </p>
                        </div>
                        : <p 
                                style={isImg 
                                    ? {background: `url(${SelectImg})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right'} 
                                    : {background: 'none'}
                                }
                            >
                                {value}
                        </p>
                }
            </div>
            
            {multiple
                ? <div className={styles['multiple-select_value']}>
                    {
                    multipleValue.map(item => 
                        <div className={styles['multiple-select_value_item']}>
                            <span>{checkItemLength(item)}</span>
                            <button onClick={(e: any) => handleButtonClick(e)}>x</button>
                        </div>
                    )  
                    }
                </div>
                : null
            }
        </div>
    )
};

export default Select;
