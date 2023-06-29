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

        const handleLiClick = (obj: {id: number, name: string}) => {
            if (multiple) {
                const copy = Object.assign([], resultFiltration);
                copy.push(obj);
                setResultFiltration(copy);
                setIsOpen(false);
                setResult(copy);
            } else {
                setValue(obj.name);
                setIsOpen(false);
            };
        };

        const handleCloseButtonClick = (e: any) => {
            const index = resultFiltration.findIndex(item => item.id === e.target.id);
            const copy = Object.assign([], resultFiltration);
            if (index) {
                copy.splice(index, 1);
                setResultFiltration(copy);
                setResultFiltration(copy);
            } else {
                setResult(resultFiltration);
            }
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
                        resultFiltration.map(item => 
                            <div className={styles['multiple-select_value_item']}>
                                <span>{checkItemLength(item.name)}</span>
                                <button onClick={(e: any) => handleCloseButtonClick(e)}>x</button>
                            </div>
                        )  
                        }
                    </div>
                    : null
                }
            </div>
        )
    };

export default ObjectSelector;
