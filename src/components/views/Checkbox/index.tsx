import styles from './style.module.scss';
import Gender from '../../../models/EnumGender';
import { useState, useEffect } from 'react';

interface CheckboxPropsTypes{
    getGender: Function;
    genderValue?: number | undefined; 
}

const Checkbox = (props: CheckboxPropsTypes) => {
    const { getGender } = props;
    const [gender, setGender] = useState<number>(Gender.Male);

    useEffect(() => {
        if (props.genderValue) {
            setGender(props.genderValue);
        }
    }, []);

    const handleSwitchClick = () => {
        if (gender == Gender.Male) {
            setGender(Gender.Female);
            getGender(Gender.Female)
        } else {
            setGender(Gender.Male);
            getGender(Gender.Male);
        }
    }

    return (
        <div className={styles.switcher}>
            <span 
                className={styles['switcher_sex']}
                style={gender === Gender.Male
                    ? {color: '#0488FD', fontWeight:700}
                    : {color: '#C1CAD2'}
                }
            >
                M
            </span>
            <label className={styles.switch}>
                <input type="checkbox"  onClick={handleSwitchClick}/>
                <span className="slider round"></span>
            </label>
            <span 
                className={styles['switcher_sex']}
                style={gender === Gender.Male
                    ? {color: '#C1CAD2'}
                    : {color: '#FF3C82', fontWeight:700}
                }
            >
                Ж
            </span>
        </div>

    )                         
       
}
export default Checkbox;
