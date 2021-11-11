import React from 'react';
import s from './RedoButton.module.css';
import {ReactComponent as RedoIcon} from '../../../../../../img/Redo2.svg'

type propsType = {
    isDisabled: boolean,
}

function RedoButton({isDisabled}: propsType) {
    return (
        <div className={`${s.redoButton} ${isDisabled? s.redoButton_disabled: ''}`} onClick={!isDisabled? ()=>console.log('redo'): ()=>{}}>
            <RedoIcon />
        </div>
    );
}


export {RedoButton};