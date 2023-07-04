import styles from './style.module.scss';
import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

interface CustomInputPropsTypes{
    setValue: Function;
    defaultValue?: string;
    placeholderValue?: string;
    labelValue?: string;
    type?: string;
}

const CustomInput = (props: CustomInputPropsTypes) => {

    const { setValue, defaultValue, placeholderValue, labelValue, type } = props;

    const [inputValue, setInputValue] = useState<string>('');
    const [isActive, setIsActive] = useState<boolean>(false);

    const handleInputChange = (e: any) => {
        setInputValue(e.target.value);
        setValue(e.target.value);
        setIsActive(true);
    }

    const handleInputActivation = () => {
        setIsActive(true);
        if (defaultValue) {
            setInputValue(defaultValue);
        } else {
            setInputValue(inputValue);
        }
    }

    useEffect(() => {
        if(defaultValue) {
            setValue(defaultValue);
        }
    }, []);

    const [startDate, setStartDate] = useState<Date>(new Date());

    return (
            <div className={styles['active-input']}>
                {isActive && type === 'text'? <label htmlFor="activeInput">{labelValue}</label> : null}
                {isActive && type === 'date'
                    ? <DatePicker 
                        selected={startDate}
                        onChange={
                            (date: Date) => {
                                setStartDate(date); 
                                setValue(date.toLocaleDateString());
                                setInputValue(date.toLocaleDateString());
                            }} 
                        onSelect={() => setIsActive(false)}
                    />
                    : <input                 
                        type={isActive ? type : 'text'} 
                        className={isActive ? styles['focused-input'] : styles['text-input']} 
                        placeholder={placeholderValue} 
                        defaultValue={inputValue}
                        onInput={handleInputChange} 
                        onBlur={() => setIsActive(false)}
                        onClick={handleInputActivation}
                    />
                }
            </div>

    )
}

export default CustomInput;
