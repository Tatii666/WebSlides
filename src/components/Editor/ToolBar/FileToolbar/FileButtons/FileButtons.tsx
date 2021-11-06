import React from 'react';
import s from './FileButtons.module.css';

function FileButtons(props: any) {
    return (
        <div className={s.FileButtons}>
            <div className={s.buttonIcon}>
                <img src={props.iconSrc} alt={props.text + ' icon'}/>
            </div>
            <div className={s.buttonText}>{props.text}</div>
        </div>
    );
}

export {FileButtons};