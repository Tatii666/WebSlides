import React from 'react';
import s from './EditorArea.module.css';
import {SlideCanvas} from "./SlideCanvas/SlideCanvas";
import {getEditor} from "../../../editor";

function EditorArea() {
    const state = getEditor();
    const activeSlideId = state.selectedSlides.length? state.selectedSlides[state.selectedSlides.length-1].id : null;
    const activeSlide = activeSlideId? state.Presentation.slides[activeSlideId] : null;

    return (
        <div className={s.editorArea}>
            <SlideCanvas slide={activeSlide}/>
        </div>
    );
}


export {EditorArea};