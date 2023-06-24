import styles from './style.module.scss';
import { useState } from 'react';
import EyeImg from '../../../assets/images/icons/eye-icon.svg';

interface PasswordPropsTypes{
    getPasswordValue: Function;
}

const Password = (props: PasswordPropsTypes) => {
    const { getPasswordValue } = props;

    const [isActivePassword, setIsActivePassword] = useState<boolean>(false);
    const [showedPassword, setShowedPassword] = useState<boolean>(false);

    const handlePasswordChange = (e: any) => {getPasswordValue(e.target.value)}

    const showPassword = () => {
        setShowedPassword(!showedPassword);
    }
    return (
        <div className={styles.password}>
            {isActivePassword? <label htmlFor="password">Пароль</label>: null}
            <input 
                type={showedPassword
                    ? "text"
                    : "password"
                } 
                name="password" placeholder="Введите пароль"
                onInput={handlePasswordChange}
                onClick={() => setIsActivePassword(true)}
                style={isActivePassword
                    ? {border: 'none', borderBottom: '1px solid #309FFF', borderRadius: 0}
                    : {border: '1px solid #C1CAD2', borderRadius: '6px'}
                }
            />
            {isActivePassword
                ? <img 
                    src={EyeImg} alt="a" className={styles['password_eye']}
                    onClick={() => showPassword()}
                />
                : null
            }
        </div>                               
    )
}

export default Password;
