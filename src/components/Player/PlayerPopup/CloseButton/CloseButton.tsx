import React from 'react';
import s from './CloseButton.module.css';

type propsType = {
    setEditorMode: Function,
}

function CloseButton ({setEditorMode}: propsType){
    return (
        <button className={s.closeButton} onClick={() => setEditorMode()}>
            X
        </button>
    );
}

export {CloseButton};