import React from 'react';
import s from './NewSlideButton.module.css';

function NewSlideButton() {
    return (
        <div className={s.newSlideButton}>
            <div className={s.buttonIcon}>
                NEW SLIDE
            </div>
        </div>
    );
}

export {NewSlideButton};