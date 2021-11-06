import React from 'react';
import s from './UndoButton.module.css';
import Undo from '../../../../../img/Undo.png'

function UndoButton() {
    return (
        <div className={s.undoButton} onClick={()=>console.log('undo')}>
            <img src={Undo} alt={'undo icon'}/>
        </div>
    );
}


export {UndoButton};