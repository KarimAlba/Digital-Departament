import styles from'./style.module.scss';
import { useState, useEffect } from 'react';
import SelectImg from '../../../assets/images/icons/select-icon.svg';

interface ObjectSelectorPropsTypes{
    variation: {id: number, name: string}[];
    setResult: Function;
    multiple: boolean;
    defaultValue: string;
    isImg?: boolean;
    placeholderVal?: string;
}

const ObjectSelector = (props: ObjectSelectorPropsTypes) => {
    const { variation, multiple, setResult, defaultValue, isImg, placeholderVal } = props;

        const [isOpen, setIsOpen] = useState<boolean>(false);
        const [value, setValue] = useState<string>(defaultValue);
        const [resultFiltration, setResultFiltration] = useState<{id: number, name: string}[]>([]);

        const checkItemLength = (element: string) => {
            if (element.length > 13) {
                const slicedElem = element.slice(0, 12);
                const result = slicedElem + '...';
                return result;
            } return element;
        };

        const menu = variation.map(item => 
            <li key={item.id + item.name} onClick={() => handleLiClick(item)}>
                {checkItemLength(item.name)}
            </li>
        );

        const handleDivClick = () => {
            setIsOpen(!isOpen);
        };

        const prepareParam = () => {
            if (defaultValue === 'Автор') {
                return 1;
            } else {
                return  0;
            }
        }

        const handleLiClick = (obj: {id: number, name: string}) => {
            const copy = Object.assign([], resultFiltration);
            copy.push(obj);
            setResultFiltration(copy);
            setIsOpen(false);
            setResult(prepareParam(), copy);
        };

        const handleCloseButtonClick = (e: any, elem: {id: number, name: string}) => {
            const copy = Object.assign([], resultFiltration);
            const index = resultFiltration.findIndex(item => item.id === elem.id);

            if (index !== -1) {
                copy.splice(index, 1);
                setResultFiltration(copy);
                setResult(prepareParam(), copy);
            } else {
                setResult(prepareParam(), resultFiltration);
            }
        }; 

        return (
            <div style={{position: 'relative'}}>
                <div className={styles.select} onClick={handleDivClick}>
                    {
                        isOpen 
                            ? <span onClick={() => setIsOpen(false)}>Закрыть</span>
                            : null
                    }
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
                                    {resultFiltration.length ? placeholderVal: defaultValue } 
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
                        resultFiltration.map((item) => 
                            (<div className={styles['multiple-select_value_item']} key={item.id + item.name}>
                                <span key={item.id*54 + item.name}>{checkItemLength(item.name)}</span>
                                <button 
                                    onClick={(e: any) => handleCloseButtonClick(e, item)} 
                                    key={item.id + item.name.split('').reverse().join('')}
                                >
                                    x
                                </button>
                            </div>)
                        )  
                        }
                    </div>
                    : null
                }
            </div>
        )
    };

export default ObjectSelector;
