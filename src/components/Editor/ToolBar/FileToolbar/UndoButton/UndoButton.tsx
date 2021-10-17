import React from 'react';
import s from './UndoButton.module.css';

function UndoButton() {
    return (
        <div className={s.undoButton} onClick={()=>console.log('undo')}>
            undo
        </div>
    );
}


export {UndoButton};