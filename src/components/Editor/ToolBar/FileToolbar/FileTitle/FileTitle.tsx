import React, {useState} from 'react';
import s from './FileTitle.module.css';
import {dispatch} from "../../../../../editor";
import {setPresentationTitle} from "../../../../../functions";

type propsType = {title: string}

/**
 * @param {{
 * title: string,
 * }} props
 */
function FileTitle(props: propsType) {
    const [title, setTitle] = useState(props.title);

    return (
        <div className={s.fileTitle}>
            <input type="text"
                   value={title}
                   className={s.fileTitleInput}
                   onChange={(event)=>setTitle(event.target.value)}
                   onBlur={() => {
                       if (title.trim() !== '') {
                           dispatch(setPresentationTitle, title.trim())
                           setTitle(title.trim())
                       } else {
                           setTitle(props.title)
                       }
                   }}
            />
        </div>
    );
}


export {FileTitle};