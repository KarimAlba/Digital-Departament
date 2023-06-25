import styles from './style.module.scss';
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

interface CustomInputPropsTypes{
    getValue: Function;
    defaultValue?: string;
    placeholderValue?: string;
    labelValue?: string;
    type?: string;
}

const CustomInput = (props: CustomInputPropsTypes) => {

    const { getValue, defaultValue, placeholderValue, labelValue, type } = props;

    const [value, setValue] = useState<string>('');
    const [isActive, setIsActive] = useState<boolean>(false);

    const handleInputChange = (e: any) => {
        setValue(e.target.value);
        getValue(e.target.value);
        setIsActive(true);
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
                    ? <DatePicker selected={startDate} onChange={(date: Date) => {setStartDate(date); setValue(date.toLocaleDateString())}} onSelect={() => setIsActive(false)}/>
                    : <input                 
                        type={isActive ? type : 'text'} 
                        className={isActive ? styles['focused-input'] : styles['text-input']} 
                        placeholder={placeholderValue} defaultValue={value}
                        onInput={handleInputChange} onBlur={() => setIsActive(false)}
                        onClick={() => setIsActive(true)}
                    />
                }
            </div>

    )
}

export default CustomInput;
