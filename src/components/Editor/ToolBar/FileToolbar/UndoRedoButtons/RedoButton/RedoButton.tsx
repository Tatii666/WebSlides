import React from 'react';
import s from './RedoButton.module.css';
import Redo from '../../../../../../img/Redo.png'

type propsType = {
    isDisabled: boolean,
}

function RedoButton({isDisabled}: propsType) {
    return (
        <div className={`${s.redoButton} ${isDisabled? s.redoButton_disabled: ''}`} onClick={!isDisabled? ()=>console.log('redo'): ()=>{}}>
            <img src={Redo} alt={'undo icon'}/>
        </div>
    );
}


export {RedoButton};