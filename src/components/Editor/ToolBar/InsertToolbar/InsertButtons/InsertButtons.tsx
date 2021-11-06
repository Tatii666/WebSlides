import React from 'react';
import s from './InsertButtons.module.css';

function InsertButtons(props:any) {
    return (
        <div className={s.InsertButtons}>
            <div className={s.buttonIcon}>
                <img src={props.iconSrc} alt={props.text + ' icon'}/>
            </div>
            <div className={s.buttonText}>{props.text}</div>
        </div>
    );
}

export {InsertButtons};