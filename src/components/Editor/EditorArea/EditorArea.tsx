import React from 'react';
import s from './EditorArea.module.css';
import {SlideContent} from "./SlideContent/SlideContent";
import {getEditor} from "../../../editor";

function EditorArea() {
    const state = getEditor();
    const slide = state.activeSlide? state.Presentation.slides[state.activeSlide] : null;

    return (
        <div className={s.editorArea}>
            <SlideContent isEditor={true} slide={slide} selectedElements={state.selectedElements}/>
        </div>
    );
}


export {EditorArea};