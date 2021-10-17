import React from 'react';
import s from './FileTitle.module.css';

/**
 * @param {{
 * title: string,
 * }} props
 */
function FileTitle(props: any) {
    return (
        <div className={s.fileTitle}>
            <input type="text" value={props.title}  className={s.fileTitleInput} onChange={(event)=>console.log(event)}/>
        </div>
    );
}


export {FileTitle};