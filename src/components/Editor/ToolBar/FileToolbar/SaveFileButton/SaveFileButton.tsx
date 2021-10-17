import React from 'react';
import s from './SaveFileButton.module.css';

function SaveFileButton() {
    return (
        <div className={s.newFileButton}>
            <div className={s.buttonIcon}></div>
            <div className={s.buttonText}>SAVE</div>
        </div>
    );
}

export {SaveFileButton};