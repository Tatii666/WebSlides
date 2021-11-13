import React from 'react';
import s from './PreviewButton.module.css';
import {selectNextSlide, setViewMode} from "../../../../../functions";
import {dispatch, getEditor} from "../../../../../editor";

function onClick() {
    const activeSlide = getEditor().activeSlide;
    if (!activeSlide) {
        dispatch(selectNextSlide, {})
    }
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