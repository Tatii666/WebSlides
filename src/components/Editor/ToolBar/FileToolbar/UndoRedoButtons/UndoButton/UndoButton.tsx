import React from 'react';
import s from './UndoButton.module.css';
import {ReactComponent as UndoIcon} from '../../../../../../img/Undo2.svg'
import {dispatch} from "../../../../../../editor";
import {doUndo} from "../../../../../../functions";

type propsType = {
    isDisabled: boolean,
}

function onUndoClick() {
    dispatch(doUndo, {});
}

function UndoButton({isDisabled}: propsType) {
    return (
        <div className={`${s.undoButton} ${isDisabled? s.undoButton_disabled: ''}`} onClick={!isDisabled ? onUndoClick : ()=>{}}>
            <UndoIcon />
        </div>
    );
}


export {UndoButton};