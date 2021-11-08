import React, {useEffect} from 'react';
import s from './Player.module.css';
import {SlideContent} from "./SlideContent/SlideContent";
import {PlayerPopup} from "./PlayerPopup/PlayerPopup";
import {dispatch, getEditor} from "../../editor";
import {selectNextSlide} from "../../functions";
import {EditorType} from "../../dataModel/editorDataModel";

type PlayerPropsType = {
    editor: EditorType,
}

function Player({editor}: PlayerPropsType) {
    const selectedSlideId = editor.selectedSlides[editor.selectedSlides.length - 1].id;
    if (!selectedSlideId) {
        dispatch(selectNextSlide, {})
    }
    return (
        <div className={s.player}>
            <div className={s.slideContainer}>
                <SlideContent slide={getEditor().Presentation.slides[selectedSlideId]}/>
            </div>
            <PlayerPopup />
        </div>
    );
}


export {Player};