import React from 'react';
import s from './UndoButton.module.css';
import {ReactComponent as UndoIcon} from '../../../../../../img/Undo2.svg'

type propsType = {
    isDisabled: boolean,
}

function UndoButton({isDisabled}: propsType) {
    return (
        <div className={`${s.undoButton} ${isDisabled? s.undoButton_disabled: ''}`} onClick={!isDisabled? ()=>console.log('undo'): ()=>{}}>
            <UndoIcon />
        </div>
    );
}


export {UndoButton};