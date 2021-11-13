import React from 'react';
import s from './EditorArea.module.css';
import {SlideCanvas} from "./SlideCanvas/SlideCanvas";
import {getEditor} from "../../../editor";

function EditorArea() {
    const state = getEditor();
    const slide = state.activeSlide? state.Presentation.slides[state.activeSlide] : null;

    return (
        <div className={s.editorArea}>
            <SlideCanvas slide={slide}/>
        </div>
    );
}


export {EditorArea};