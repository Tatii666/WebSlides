import React, {useEffect, useState} from 'react';
import s from './FileTitle.module.css';
import {dispatch} from "../../../../../editor";
import {setPresentationTitle} from "../../../../../functions";

type propsType = {
    title: string,
}

/**
 * @param {{
 * title: string,
 * }} props
 */
function FileTitle({title}: propsType) {
    const [newTitle, setTitle] = useState(title);

    useEffect(() => {
        setTitle(title);
    }, [title])

    return (
        <div className={s.fileTitle}>
            <input type="text"
                   value={newTitle}
                   className={s.fileTitleInput}
                   onChange={(event)=>setTitle(event.target.value)}
                   onBlur={() => {
                       if (newTitle.trim() !== '') {
                           dispatch(setPresentationTitle, newTitle.trim())
                           setTitle(newTitle.trim())
                       } else {
                           setTitle(title)
                       }
                   }}
            />
        </div>
    );
}


export {FileTitle};