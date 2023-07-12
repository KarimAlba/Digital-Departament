import styles from './style.module.scss';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchImg from '../../../assets/images/icons/search-icon.svg';
import TagsAPI from '../../../api/TagsAPI';

interface TagsPagePropsTypes{
    setSubject: Function;
}

const TagsPage = (props: TagsPagePropsTypes) => {
    const { setSubject } = props;
    const [tags, setTags] = useState<{id: number, name: string}[]>([]);
    const navigate = useNavigate();

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

    const handleTagClick = (item: {id: number, name: string}) => {
        navigate('/main/library');
        setSubject(item);
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
                    <li key={item.name + item.id} onClick={() => handleTagClick(item)}>
                        {'#' + item.name}
                    </li>
                )}
            </ul>
        </div>
    )
}

export default TagsPage;
