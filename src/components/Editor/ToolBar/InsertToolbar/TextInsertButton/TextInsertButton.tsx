import React from 'react';
import s from './TextInsertButton.module.css';

function TextInsertButton() {
    return (
        <div className={s.textInsertButton}>
            <div className={s.buttonIcon}></div>
            <div className={s.buttonText}>TEXT</div>
        </div>
    );
}

export {TextInsertButton};