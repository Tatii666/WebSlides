import React from 'react';
import s from './CloseButton.module.css';

function CloseButton (){
    return (
        <button className={s.closeButton}>
            X
        </button>
    );
}

export {CloseButton};