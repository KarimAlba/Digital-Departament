import styles from './style.module.scss';
import { useState, useEffect } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import SearchImg from '../../../assets/images/icons/search-icon.svg';
import TagsAPI from '../../../api/TagsAPI';
import Library from '../Library';

const TagsPage = (props: any) => {
    const [tags, setTags] = useState<{id: number, name: string}[]>([]);

    const handleInputChange = (val: string) => {
        sendReq(val);
    }

    const sendReq = (name?: string) => {
        TagsAPI.getTags(name)
            .then(response => {
                console.log(response);
                setTags(response.data);
            })
            .catch(error => console.log(error))
    }
    
    useEffect(() => {
        sendReq();
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.search}>
                <h2>Тэги</h2>
                <input 
                    type="text" 
                    placeholder='Поиск по тэгу'
                    style={{backgroundImage: `url(${SearchImg})`}}
                    onInput={(e: any) => handleInputChange(e.target.value)}
                />
            </div>

            <ul>
                {tags.map(item => 
                    <li key={item.name + item.id}>
                        <Link 
                            to='/main/library'
                            state={{ tagId: item.id }}
                            key={item.id + item.name}
                        >
                            {'#' + item.name}
                        </Link>
                    </li>
                )}
            </ul>
        </div>
    )
}

export default TagsPage;
