import React from 'react';
import s from './LoadFileButton.module.css';

function LoadFileButton() {
    return (
        <div className={s.newFileButton}>
            <div className={s.buttonIcon}></div>
            <div className={s.buttonText}>LOAD</div>
        </div>
    );
}

export {LoadFileButton};