import React from 'react';
import s from './FileButtons.module.css';

type propsType = {
    text: string,
    iconSrc: string,
    onClick: () => void,
}

function FileButtons({text, iconSrc, onClick}: propsType) {
    return (
        <div className={s.FileButtons} onClick={onClick}>
            <div className={s.buttonIcon}>
                <img src={iconSrc} alt={text + ' icon'}/>
            </div>
            <div className={s.buttonText}>{text}</div>
        </div>
    );
}

export {FileButtons};