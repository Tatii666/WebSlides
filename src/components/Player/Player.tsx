import React, {useState} from 'react';
import s from './Player.module.css';
import {SlideContent} from "./SlideContent/SlideContent";
import {PlayerPopup} from "./PlayerPopup/PlayerPopup";
import {dispatch} from "../../editor";
import {selectNextSlide} from "../../functions";
import {EditorType} from "../../dataModel/editorDataModel";

type PlayerPropsType = {
    editor: EditorType,
}
/**
 * @param {{
 *   editor: EditorType,
 * }} props
 */
function Player({editor}: PlayerPropsType) {
    const [statePointer, setStatePointer] = useState(false);
    const activeSlideId = editor.activeSlide;
    if (!activeSlideId) {
        dispatch(selectNextSlide, {})
    }
    return (
        <div className={s.player}>
            <div className={s.slideContainer}>
                <SlideContent slide={editor.Presentation.slides[activeSlideId]}/>
            </div>
            <PlayerPopup pointer={{statePointer, setStatePointer}}/>
        </div>
    );
}


export {Player};