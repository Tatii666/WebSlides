import React from 'react';
import s from './PictureInsertButton.module.css';

function PictureInsertButton() {
    return (
        <div className={s.pictureInsertButton}>
            <div className={s.buttonIcon}></div>
            <div className={s.buttonText}>PICTURE</div>
        </div>
    );
}

export {PictureInsertButton};