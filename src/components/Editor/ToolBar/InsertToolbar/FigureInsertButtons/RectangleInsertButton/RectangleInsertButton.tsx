import React from 'react';
import s from './RectangleInsertButton.module.css';

function RectangleInsertButton() {
    return (
        <div className={s.rectangleInsertButton}>
            <div className={s.buttonIcon}>Rectangle</div>
        </div>
    );
}

export {RectangleInsertButton};