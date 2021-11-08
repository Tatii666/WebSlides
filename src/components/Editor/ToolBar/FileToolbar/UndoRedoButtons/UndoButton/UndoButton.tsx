import React from 'react';
import s from './UndoButton.module.css';
import Undo from '../../../../../../img/Undo.png'

type propsType = {
    isDisabled: boolean,
}

function UndoButton({isDisabled}: propsType) {
    return (
        <div className={`${s.undoButton} ${isDisabled? s.undoButton_disabled: ''}`} onClick={!isDisabled? ()=>console.log('undo'): ()=>{}}>
            <img src={Undo} alt={'undo icon'}/>
        </div>
    );
}


export {UndoButton};