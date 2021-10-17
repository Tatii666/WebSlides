import React from 'react';
import s from './RedoButton.module.css';

function RedoButton() {
    return (
        <div className={s.redoButton} onClick={()=>console.log('redo')}>
            redo
        </div>
    );
}


export {RedoButton};