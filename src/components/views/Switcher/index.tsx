import styles from './style.module.scss';
import EnumGender from '../../../models/request/EnumGender';
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
            setUserGender(EnumGender.Male);
            getGender(EnumGender.Male);
        } else {
            setUserGender(EnumGender.Female);
            getGender(EnumGender.Female);
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
        <div className={styles.switcher}>
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
                onClick={handleSwitcherClick}
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
