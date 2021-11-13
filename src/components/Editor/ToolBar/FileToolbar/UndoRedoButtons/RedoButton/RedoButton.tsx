import React from 'react';
import s from './RedoButton.module.css';
import {ReactComponent as RedoIcon} from '../../../../../../img/Redo2.svg'
import {dispatch} from "../../../../../../editor";
import {doRedo} from "../../../../../../functions";

type propsType = {
    isDisabled: boolean,
}

function onRedoClick() {
    dispatch(doRedo, {});
}

function RedoButton({isDisabled}: propsType) {
    return (
        <div className={`${s.redoButton} ${isDisabled? s.redoButton_disabled: ''}`} onClick={!isDisabled ? onRedoClick : ()=>{}}>
            <RedoIcon />
        </div>
    );
}


export {RedoButton};