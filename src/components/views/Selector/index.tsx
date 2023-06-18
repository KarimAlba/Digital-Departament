import styles from './style.module.scss';
import { useEffect, useState } from 'react';

interface SelectPropsTypes{
    variation: string[];
    getResult: Function;
    multiple: boolean;
    defaultValue: string;
}

const Select = (props: SelectPropsTypes) => {
    const { variation, multiple, getResult, defaultValue } = props;
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [value, setValue] = useState<string>(defaultValue);

    const menu = variation.map(item => 
        <li key={item} onClick={() => {
            handleLiClick(item);
        }}>
            {item}
        </li>
    )

    const handleDivClick = () => {
        setIsOpen(!isOpen);
    }

    const handleLiClick = (val: string) => {
        setValue(val);
        setIsOpen(false);
        getResult(val);
    }

    useEffect(() => {
        console.log(defaultValue);
    }, []);

    return (
        <div className={styles.select} onClick={handleDivClick}>
            {isOpen
                ? (<ul className={styles.list}>{menu}</ul>)
                : <p>{value}</p>
            }
        </div>
    )
}

export default Select;
