import React, {useRef, useState} from 'react';
import s from './Player.module.css';
import {PlayerPopup} from "./PlayerPopup/PlayerPopup";
import {dispatch} from "../../editor";
import {selectFirstSlide} from "../../functions";
import {EditorType} from "../../dataModel/editorDataModel";
import {SlideContent} from "../Editor/EditorArea/SlideContent/SlideContent";
import {useRatioResize} from "../../customHooks/useRatioResize";

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
    const player = useRef<HTMLDivElement>(null);
    const {width, height, scaleKoef} = useRatioResize(player);
    const activeSlideId = editor.activeSlide;
    if (!activeSlideId) {
        dispatch(selectFirstSlide, {})
        return null
    }

    return (
        <div className={s.player} ref={player}>
            <div
                className={s.slideContainer}
                style={{
                    width: `${width}px`,
                    height: `${height}px`,
                }}
            >
                <SlideContent
                    isEditor={false}
                    slide={editor.Presentation.slides[activeSlideId]}
                    selectedElements={[]}
                    scaleTransformValue={scaleKoef}
                />
            </div>
            <PlayerPopup pointer={{statePointer, setStatePointer}}/>
        </div>
    );
}


export {Player};