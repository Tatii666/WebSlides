import React from 'react';
import s from './CloseButton.module.css';
import {dispatch} from "../../../../editor";
import {setEditMode} from "../../../../functions";

function onClick() {
    dispatch(setEditMode, {})
}

function CloseButton (){
    return (
        <button className={s.closeButton} onClick={onClick}>
            X
        </button>
    );
}

export {CloseButton};