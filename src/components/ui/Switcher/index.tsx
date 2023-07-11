import styles from './style.module.scss';
import EnumGender from '../../../models/enums/EnumGenderRequest';
import { useState, useEffect } from 'react';

interface SwitcerPropsTypes{
    getGender: Function;
    genderValue?: EnumGender; 
}

const Switcher = (props: SwitcerPropsTypes) => {
    const { getGender, genderValue } = props;
    const [userGender, setUserGender] = useState<EnumGender>(EnumGender.Male);

    const handleSwitcherClick = () => {
        if (userGender) {
            setUserGender(EnumGender.Female);
            getGender(EnumGender.Female);
        } else {
            setUserGender(EnumGender.Male);
            getGender(EnumGender.Male);
        }
    }

    useEffect(() => {
        if (genderValue == EnumGender.Male) {
            setUserGender(EnumGender.Male);
        } else {
            setUserGender(EnumGender.Female);
        }
    }, []);

    return (
        <div className={styles.switcher} onClick={handleSwitcherClick}>
            <span 
                className={styles['switcher_sex']}
                style={userGender === EnumGender.Male
                    ? {color: '#0488FD', fontWeight:700}
                    : {color: '#C1CAD2'}
                }
            >
                M
            </span>

            <div 
                className={styles.background}
                style={userGender === EnumGender.Male
                    ? {backgroundColor: '#0488FD'}
                    : {backgroundColor: '#FF3C82'}
                }
            >
                {userGender === EnumGender.Male
                    ? <span className={styles.maleSlider}></span>
                    : <span className={styles.femaleSlider}></span>
                }
            </div>

            <span 
                className={styles['switcher_sex']}
                style={userGender === EnumGender.Male
                    ? {color: '#C1CAD2'}
                    : {color: '#FF3C82', fontWeight:700}
                }
            >
                Ж
            </span>
        </div>
    )
}

export default Switcher;
