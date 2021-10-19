import React from 'react';
import s from './CircleInsertButton.module.css';

function CircleInsertButton() {
    return (
        <div className={s.circleInsertButton}>
            <div className={s.buttonIcon}>Circle</div>
        </div>
    );
}

export {CircleInsertButton};