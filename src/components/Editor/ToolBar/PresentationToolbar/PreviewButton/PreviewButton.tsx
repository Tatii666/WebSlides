import React from 'react';
import s from './PreviewButton.module.css';
import {setViewMode} from "../../../../../functions";
import {dispatch} from "../../../../../editor";

function onClick() {
    dispatch(setViewMode, {})
}

function PreviewButton() {
    return (
        <div className={s.previewButton} contentEditable={false} onClick={onClick}>
            <span>PREVIEW</span>
        </div>
    );
}

export {PreviewButton};