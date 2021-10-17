import React from 'react';
import s from './NewFileButton.module.css';

function NewFileButton() {
    return (
        <div className={s.newFileButton}>
            <div className={s.buttonIcon}></div>
            <div className={s.buttonText}>NEW</div>
        </div>
    );
}

export {NewFileButton};