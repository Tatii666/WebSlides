import React from 'react';
import s from './PreviewButton.module.css';
import {setViewMode} from "../../../../../functions";
import {dispatch} from "../../../../../editor";

type PropsType = {
    isActive: boolean,
}

function onClick(isActive: boolean) {
    if (isActive) {
        dispatch(setViewMode, {})
    }
}

function PreviewButton({isActive}: PropsType) {
    const activeClass = isActive ? ` ${s.previewButton_active}` : '';
    return (
        <div className={s.previewButton + activeClass} contentEditable={false} onClick={()=>{onClick(isActive)}}>
            <span>PREVIEW</span>
        </div>
    );
}

export {PreviewButton};