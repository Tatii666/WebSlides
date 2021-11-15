import React, {useState} from 'react';
import s from './Player.module.css';
import {PlayerPopup} from "./PlayerPopup/PlayerPopup";
import {dispatch} from "../../editor";
import {selectFirstSlide} from "../../functions";
import {EditorType} from "../../dataModel/editorDataModel";
import {SlideContent} from "../Editor/EditorArea/SlideContent/SlideContent";

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
        dispatch(selectFirstSlide, {})
        return null
    }
    return (
        <div className={s.player}>
            <div className={s.slideContainer}>
                <SlideContent
                    isEditor={false}
                    slide={editor.Presentation.slides[activeSlideId]}
                    selectedElements={[]}
                />
            </div>
            <PlayerPopup pointer={{statePointer, setStatePointer}}/>
        </div>
    );
}


export {Player};